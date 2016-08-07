'use strict';
var $ = require('jquery');
var Handlebars = require('handlebars');
var tmpl = require("./tmpl.html");



module.exports = {
    init: function() {
        var template = Handlebars.compile(tmpl);
        $("#main").html(template);
    }
};
