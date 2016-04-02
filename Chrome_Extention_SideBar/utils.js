var Utils = function() {
};

Utils.prototype = {
	
    getOptionValue: function(name, defaultValue) {
        var value = localStorage[name];
        if (value) {
            return value;
        } else {
            return defaultValue;
        }
    },
    
    
   /*  to change visible and message resource
   
   setVisible: function(e, visible) {
        Element.setStyle(
            e,
            {display: visible ? "inline-block" : "none"});
    },
    
    
    setMessageResources: function(hash) {
        for (var key in hash) {
            $(key).innerHTML = chrome.i18n.getMessage(hash[key]);
        }
    }, 
    */
    
    
    split: function(source, delimiter) {
        if (source && source.length > 0) {
            return source.split(delimiter);
        } else {
            return new Array();
        }
    },
    
    
    
};

var utils = new Utils();
