'use strict';
var $ = require('jquery');
var helpers = require('../utilities/handlebars/helpers.js');
var tmpl = require("./tmpl.html");

var tabMap = {
    electrical: require('../electrical'),
    thermal: require('../thermal'),
    aocs: require('../aocs'),
    camera: require('../camera')
};

var tabJson = [{
    "tabName": "Electrical",
    "tabId": "electrical"
}, {
    "tabName": "Thermal",
    "tabId": "thermal"
}, {
    "tabName": "AOCS",
    "tabId": "aocs"
}, {
    "tabName": "Camera",
    "tabId": "camera"
}];


module.exports = {
    init: function() {
        var template = helpers.compile(tmpl);
        $("#omc-tabs").html(template({ tabJson }));
        this.loadTabs();
        $(".tab-head").on("click", this.tabselected);
    },
    loadTabs: function(event) {
        tabJson.map(function(item, index) {
            var el = $(".tab-pane").get(index);
            tabMap[item.tabId].init(el);
        });
    },
    tabselected: function(event) {
        console.log($(this).index());
    }
};
