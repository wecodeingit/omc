'use strict';
var tmpl = require("./tmpl.html");
var tabs = require('../tabs');
module.exports = {
    init: function() {
        $("#main").html(tmpl);
        tabs.init();
    }
};
