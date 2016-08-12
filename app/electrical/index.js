'use strict';
var $ = require('jquery');
var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require("../utilities/handlebars/helpers.js");
var mimicDisplay = require("../components/mimicDisplay");
module.exports = {
    init: function(el) {
        this.$el = $(el);
        var data = { title: "Electrical" };
        var template = helpers.compile(tmpl);
        this.$el.html(template(data));
        this.loadMimicDisplay();
    },
    loadMimicDisplay: function() {
        mimicDisplay.init(this.$el.find(".mimicDisplay"));
    }
};
