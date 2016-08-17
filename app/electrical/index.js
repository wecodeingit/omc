'use strict';
var $ = require('jquery');
var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require('../utilities/handlebars/helpers.js');
var controlPanel = require('../components/controlPanel');
var lineGraph = require('../components/lineGraph');
var electronicPanelData = require('../utilities/data/electronicPanel.js');

module.exports = {
    init: function(el) {
        this.$el = $(el);
        var data = { title: "Electrical" };
        var template = helpers.compile(tmpl);
        this.$el.html(template(data));
        this.loadControlPanel();
        this.loadGraphPanels();
    },
    loadControlPanel: function() {
        var data = electronicPanelData.data[0];
        controlPanel.init(data, this.$el.find('.controlPanel'));
    },
    loadGraphPanels: function() {
        var  g1 = { x: 'Spacecraft_Time', 'y': 'SolArray_Pow', 'legend' : 'Solar Array Power (W)' };
        var  g2 = { x: 'Spacecraft_Time', 'y': 'Bus_Volt', 'legend' : 'Bus Voltage (V)' };
        lineGraph.init(electronicPanelData.data, '.primaryGraph', g1);
        lineGraph.init(electronicPanelData.data, '.secondaryGraph', g2);
    }
};
