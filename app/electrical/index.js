'use strict';
var $ = require('jquery');
var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require('../utilities/handlebars/helpers.js');
var controlPanel = require('../components/controlPanel');
var electronicPanelData = require('../utilities/data/electronicPanel.js');
module.exports = {
    init: function(el) {
        this.$el = $(el);
        var data = { title: "Electrical" };
        var template = helpers.compile(tmpl);
        this.$el.html(template(data));
        this.loadControlPanel();
    },
    loadControlPanel: function() {
        var data = electronicPanelData.data[0];
        controlPanel.init(data, this.$el.find('.controlPanel'));
    }
};
