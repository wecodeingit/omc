'use strict';
var $ = require('jquery');
var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require("../utilities/handlebars/helpers.js");
module.exports = {
    init: function(el) {
        this.$el = $(el);
        var data = { title: "Electrical" };
        var template = helpers.compile(tmpl);
        this.$el.html(template(data));
        this.loadControlPanel();
    },
    loadControlPanel: function() {

    }
};
