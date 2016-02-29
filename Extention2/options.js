var Options = function() {
    this.initialize();
};
 
Options.prototype = {
    initialize: function() {
        window.addEventListener("load", function(evt) {
            this.start();
        }.bind(this));
    },
    start: function() {
        this.setupUIs();
        this.assignMessages();
        this.assignEventHandlers();
        this.restoreConfigurations();
        this.checkDropboxAuthorized();
        this.checkGDriveAuthorized();
        this.checkSDriveAuthorized();
        this.checkPicasaAuthorized();
        this.loadMonitor();
    },
    setupUIs: function() {
        var previewPosition = $("preview_position");
        this.createAndAppendOption("none", "optPreviewNone", previewPosition);
        this.createAndAppendOption("top_left", "optPreviewTopLeft", previewPosition);
        this.createAndAppendOption("top_right", "optPreviewTopRight", previewPosition);
        this.createAndAppendOption("bottom_left", "optPreviewBottomLeft", previewPosition);
        this.createAndAppendOption("bottom_right", "optPreviewBottomRight", previewPosition);
    },
    createAndAppendOption: function(value, resourceKey, parent) {
        var option = document.createElement("option");
        option.value = value;
        option.appendChild(document.createTextNode(chrome.i18n.getMessage(resourceKey)));
        parent.appendChild(option);
    },
    assignMessages: function() {
        var hash = {
            "optFilter": "optFilter",
            "optFilterSize": "optFilterSize",
            "optFilterSizeDescription": "optFilterSizeDescription",
            "optFilterSizeWidth": "optFilterSizeWidth",
            "optFilterSizeHeight": "optFilterSizeHeight",
            "optFilterPriorityLinkHref": "optFilterPriorityLinkHref",
            "optFilterPriorityLinkHrefDescription": "optFilterPriorityLinkHrefDescription",
            "filter_size_save": "optFilterSizeSave",
            "optPreview": "optPreview",
            "optHoverZoom": "optHoverZoom",
            "optDontHoverZoom": "optDontHoverZoom",
            "optWelcome": "optWelcome"
        };
        utils.setMessageResources(hash);
    },
    assignEventHandlers: function() {
        $("command_template_save")
            .onclick =
            this.onClickCommandTemplateSave.bind(this);
        $("filter_exts_save")
            .onclick =
            this.onClickFilterExtsSave.bind(this);
        $("filter_excepts_save")
            .onclick =
            this.onClickFilterExceptsSave.bind(this);
        $("filter_size_save")
            .onclick =
            this.onClickFilterSizeSave.bind(this);
        $("priority_link_href")
            .onclick =
            this.onClickPriorityLinkHref.bind(this);
        $("download_filename_save")
            .onclick =
            this.onClickDownloadFilenameSave.bind(this);
        $("auth_dropbox")
            .onclick =
            this.onClickAuthDropbox.bind(this);
        $("cancel_dropbox")
            .onclick =
            this.onClickCancelDropbox.bind(this);
        $("auth_gdrive")
            .onclick =
            this.onClickAuthGDrive.bind(this);
        $("cancel_gdrive")
            .onclick =
            this.onClickCancelGDrive.bind(this);
        $("without_creating_folder")
            .onclick =
            this.onClickWithoutCreatingFolder.bind(this);
        $("auth_sdrive")
            .onclick =
            this.onClickAuthSDrive.bind(this);
        $("cancel_sdrive")
            .onclick =
            this.onClickCancelSDrive.bind(this);
        $("preview_position")
            .onchange =
            this.onChangePreviewPosition.bind(this);
        $("dont_create_page_bookmark")
            .onclick =
            this.onClickDontCreatePageBookmark.bind(this);
        $("shortcut_download_service")
            .onchange =
            this.onChangeShortcutDownloadService.bind(this);
        $("use_shortcut_download_service")
            .onclick =
            this.onClickUseShortcutDownloadService.bind(this);
        $("dont_hover_zoom")
            .onclick =
            this.onClickDontHoverZoom.bind(this);
        $("auth_picasa")
            .onclick =
            this.onClickAuthPicasa.bind(this);
        $("cancel_picasa")
            .onclick =
            this.onClickCancelPicasa.bind(this);
    },
    restoreConfigurations: function() {
        chrome.runtime.getBackgroundPage(function(bg) {
            $("command_template")
                .value = bg.ic.getCommandTemplate();
            $("filter_exts")
                .value = bg.ic.getFilterExts();
            $("filter_excepts")
                .value = bg.ic.getFilterExcepts();
            $("filter_size_width")
                .value = bg.ic.getFilterSizeWidth();
            $("filter_size_height")
                .value = bg.ic.getFilterSizeHeight();
            $("priority_link_href")
                .checked = bg.ic.isPriorityLinkHref();
            $("download_filename")
                .value = bg.ic.getDownloadFilename();
            $("without_creating_folder")
                .checked = bg.ic.isWithoutCreatingFolder();
            $("preview_position")
                .value = bg.ic.getPreviewPosition();
            $("dont_create_page_bookmark")
                .checked = bg.ic.isDontCreatePageBookmark();
            $("shortcut_download_service")
                .value = bg.ic.getShortcutDownloadService();
            $("use_shortcut_download_service")
                .checked = bg.ic.isUseShortcutDownloadService();
            $("shortcut_download_service")
                .disabled = !bg.ic.isUseShortcutDownloadService();
            $("dont_hover_zoom")
                .checked = bg.ic.isDontHoverZoom();
        });
    },
    
    

    onClickFilterSizeSave: function(evt) {
        var width = $("filter_size_width")
            .value;
        var height = $("filter_size_height")
            .value;
        localStorage["filter_size_width"] = width;
        localStorage["filter_size_height"] = height;
        $("filter_size_result")
            .innerHTML =
            chrome.i18n.getMessage("optFilterSizeSaveSucceed");
        setTimeout(function() {
            $("filter_size_result")
                .innerHTML = "";
        }, 5000);
    },
    onClickPriorityLinkHref: function() {
        this.changeCheckboxConfiguration("priority_link_href");
    },
    changeCheckboxConfiguration: function(name) {
        localStorage[name] = $(name)
            .checked ? "true" : "";
    },
    
   
    onClickWithoutCreatingFolder: function() {
        this.changeCheckboxConfiguration("without_creating_folder");
    },
    onClickDontCreatePageBookmark: function() {
        this.changeCheckboxConfiguration("dont_create_page_bookmark");
    },
    onClickDontHoverZoom: function() {
        this.changeCheckboxConfiguration("dont_hover_zoom");
    },
    loadMonitor: function() {
        chrome.runtime.getBackgroundPage(function(bg) {
            bg.ic.loadMonitor({
                onSuccess: function(req) {
                    var result = req.responseJSON;
                    $("stat_remaining_job_count")
                        .innerText =
                        this.addFigure(result.job_count);
                    $("stat_page_count")
                        .innerText =
                        this.addFigure(result.page_count);
                }.bind(this)
            });
        }.bind(this));
    },
    addFigure: function(value) {
        var num = new String(value)
            .replace(/,/g, "");
        while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return num;
    },
    onChangePreviewPosition: function() {
        var value = $("preview_position")
            .value;
        localStorage["preview_position"] = value;
    },
    onChangeShortcutDownloadService: function() {
        var value = $("shortcut_download_service")
            .value;
        localStorage["shortcut_download_service"] = value;
    },
    onClickUseShortcutDownloadService: function() {
        var checked = $("use_shortcut_download_service")
            .checked;
        if (checked) {
            chrome.permissions.request({
                permissions: [
                    "notifications"
                ]
            }, function(granted) {
                if (granted) {
                    $("shortcut_download_service")
                        .disabled = false;
                } else {
                    $("use_shortcut_download_service")
                        .checked = false;
                }
                this.changeCheckboxConfiguration("use_shortcut_download_service");
            }.bind(this));
        } else {
            chrome.permissions.remove({
                permissions: [
                    "notifications"
                ]
            }, function(removed) {
                $("shortcut_download_service")
                    .disabled = true;
                this.changeCheckboxConfiguration("use_shortcut_download_service");
            }.bind(this));
        }
    }
};
 
var options = new Options();