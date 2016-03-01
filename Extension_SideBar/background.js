var IC = function() {
    this.initialize();
};

IC.SERVER_URL = "http://ics.eisbahn.jp/";

IC.prototype = {
    initialize: function() {
        this.setupEventHandler();
        this.setupContextMenus();
        this.setupBookmark();
    },
    getServerUrl: function() {
        return IC.SERVER_URL;
    },
    setupEventHandler: function() {
        chrome.runtime.onStartup.addListener(function() {
            this.establishSession();
        }.bind(this));
        chrome.runtime.onInstalled.addListener(function(details) {
            this.establishSession(function() {
                if (details.reason == "install"
                   || (details.reason == "update"
                       && details.previousVersion == "6.5.0")) {
                    var url = chrome.extension.getURL("options.html");
                    chrome.tabs.create({
                        url: url
                    });
                }
            }.bind(this));
        }.bind(this));
        chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
            if (changeInfo.status == "complete") {
                this.onSelectionChanged(id);
            }
        }.bind(this));
        chrome.tabs.onRemoved.addListener(function(id, removeInfo) {
            this.deleteTabImageInfo(id);
        }.bind(this));
        chrome.extension.onMessage.addListener(
            function(message, sender, sendRequest) {
                this.onRequest(message, sender.tab, sendRequest);
            }.bind(this)
        );
        chrome.contextMenus.onClicked.addListener(function(info, tab) {
            this.onClickContextMenu(info, tab);
        }.bind(this));
        chrome.commands.onCommand.addListener(function(command) {
            console.log(command);
            
        }.bind(this));
    },
    setupContextMenus: function() {
        chrome.contextMenus.create({
            id: "menuReloadImages",
            type: "normal",
            title: chrome.i18n.getMessage("menuReloadImages"),
            contexts: ["page"]
        });
    },
    onClickContextMenu: function(info, tab) {
        if (info.menuItemId == "menuReloadImages") {
            this.reloadImages(tab);
        }
    },
    establishSession: function(callback) {
        var url = this.getServerUrl() + "ajax/create_session";
        var token = this.getSessionToken();
        var params = {
            has_token: token != undefined
        };
        if (token) {
            params.token = token;
        }
        new Ajax.Request(url, {
            method: "post",
            parameters: params,
            onSuccess: function(req) {
                this.onReceiveEstablishSession(req);
                if (callback) {
                    callback.call();
                }
            }.bind(this),
            onFailure: function(req) {
                console.log(req);
            }.bind(this)
        });
    },
    onReceiveEstablishSession: function(req) {
        var result = req.responseJSON.result;
        var token = result.token;
        localStorage["session_token"] = token;
    },
    getSessionToken: function() {
        return localStorage["session_token"];
    },
    onRequest: function(message, tab, sendRequest) {
        if (message.type == "parsed_images") {
            var filteredImages = this.filterUrls(message.images);
            var urls = filteredImages.collect(function(image) {
                return image.url;
            });
            if (urls.length > 0) {
                this.setTabImageInfo(tab.id, {
                    urls: urls,
                    images: message.images,
                    filtered: filteredImages
                });
                chrome.pageAction.show(tab.id);
                
               /* chrome.pageAction.setIcon({
                    tabId: tab.id,
                    path: "icon19.png"
                });
                chrome.pageAction.setPopup({
                    tabId: tab.id,
                    popup: "popup.html"
                });*/
                
                
                
                chrome.pageAction.setTitle({
                    tabId: tab.id,
                    title: String(urls.length) + " images"
                });
                this.sendTargetImages(urls, tab);
                this.previewImages(filteredImages, tab);
            } else {
                this.deleteTabImageInfo(tab.id);
//                chrome.pageAction.hide(tab.id);

                chrome.pageAction.show(tab.id);
                
                chrome.pageAction.setTitle({
                    tabId: tab.id,
                    title: "No images"
                });
                this.sendTargetImages(new Array(), tab);
            }
        }
        
        // action on disable button needs improvement
        
         /*else if (message.type == "disable_button") {
            chrome.pageAction.hide(message.tabId);
        } else if (message.type == "dismiss_hotpreview") {
            localStorage["preview_position"] = "none";
        }*/
        sendRequest({});
    },
    sendTargetImages: function(urls, tab) {
        chrome.tabs.sendMessage(tab.id, {
            operation: "store_target_images",
            urls: urls,
            isHoverZoom: !this.isDontHoverZoom()
        });
    },
    
    
    reloadImages: function(tab) {
        this.deleteTabImageInfo(tab.id);
        chrome.pageAction.hide(tab.id);
        chrome.tabs.sendMessage(tab.id, {
            operation: "reload_images"
        });
    },
    
    
    onSelectionChanged: function(tabId) {
        this.executeContentScript(tabId);
    },
    executeContentScript: function(tabId) {
        chrome.tabs.executeScript(tabId, {
            file: "content_script.js"
        });
    },
    
    
    getSelectedTabImageInfo: function(callback) {
        chrome.tabs.getSelected(null, function(tab) {
            callback(this.getTabImageInfo(tab.id), tab.title, tab.url);
        }.bind(this));
    },
    
    
    getTabImageInfo: function(tabId) {
        var info = localStorage["tab_" + String(tabId)];
        if (info) {
            return info.evalJSON();
        } else {
            return null;
        }
    },
    
    
    setTabImageInfo: function(tabId, info) {
        localStorage["tab_" + String(tabId)] = Object.toJSON(info);
    },
    deleteTabImageInfo: function(tabId) {
        localStorage.removeItem("tab_" + String(tabId));
    },
    
    // get all the urls
    filterUrls: function(images) {
        var filterExts = utils.split(this.getFilterExts(), " ");
        var filterExcepts = utils.split(this.getFilterExcepts(), " ");
        var filterSizeWidth = Number(this.getFilterSizeWidth());
        var filterSizeHeight = Number(this.getFilterSizeHeight());
        var result = new Array();
        images.each(function(image) {
            var url = image.url;
            var flag = false;
            if (filterExts.length > 0) {
                for (var i = 0; i < filterExts.length; i++) {
                    if (url.toLowerCase().indexOf(
                        "." + filterExts[i].toLowerCase()) != -1) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) return;
            }
            flag = false;
            for (var i = 0; i < filterExcepts.length; i++) {
                if (url.toLowerCase().indexOf(filterExcepts[i]) != -1) {
                    flag = true;
                    break;
                }
            }
            if (flag) return;
            var width = Number(image.width);
            if (width < filterSizeWidth) return;
            var height = Number(image.height);
            if (height < filterSizeHeight) return;
            if (image.tag == "img") {
                if (this.isPriorityLinkHref() && image.hasLink) return;
            }
            result.push(image);
        }.bind(this));
        return result;
    },
    
    // defalut value for type nedd to be in input
    getFilterExts: function() {
        return utils.getOptionValue("filter_exts", "jpeg jpg gif png *");
    },
    
    // function for exclude urls (in testing)
    getFilterExcepts: function() {
        return utils.getOptionValue("filter_excepts", "any");
    },
    getFilterSizeWidth: function() {
        return utils.getOptionValue("filter_size_width", "50");
    },
    getFilterSizeHeight: function() {
        return utils.getOptionValue("filter_size_height", "50");
    },
    isPriorityLinkHref: function() {
        return Boolean(localStorage["priority_link_href"]);
    },

    endsWith: function(source, suffix) {
        var sub = source.length - suffix.length;
        return (sub >= 0) && (source.lastIndexOf(suffix) === sub);
    },
   
    
  


// need to improve
    isDontHoverZoom: function() {
        return Boolean(localStorage["dont_hover_zoom"]);
    },
 
    

       previewImages: function(images, tab) {
        var previewPosition = this.getPreviewPosition();
        if (previewPosition != "none") {
            chrome.tabs.sendMessage(tab.id, {
                operation: "preview_images",
                images: images,
                position: previewPosition,
                tabId: tab.id
            });
        }
    },



    getPreviewPosition: function() {
        return utils.getOptionValue("preview_position", "bottom_right");
    }
    
    
    
    
    
    
};

var ic = new IC();
