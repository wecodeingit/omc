'use strict';

var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require('../utilities/handlebars/helpers.js');
var controlPanel = require('../components/controlPanel');
var lineGraph = require('../components/lineGraph');
var electronicPanelData = require('../utilities/data/electronicPanel.js');

module.exports = {
    init: function(el) {
        this.$el = $(el);
        var data = { title: "Electrical", primaryGraphName: "Solar Power Graph", secondaryGraphName: "Bus Voltage Graph" };
        var template = helpers.compile(tmpl);
        this.$el.html(template(data));
        this.loadControlPanel();
        this.loadGraphPanels();
    },
    loadControlPanel: function() {
        var data = electronicPanelData.data[0];
        controlPanel.init(data);
    },
    loadGraphPanels: function() {
        var SolarArrayGraphOptions = {
            xAxisId: 'Spacecraft_Time',
            xAxisName: 'Spacecraft Time',
            xAxisUnit: 'sec',
            yAxisId: 'SolArray_Pow',
            yAxisName: 'Solar Array Power',
            yAxisUnit: 'W',
            width: this.$el.find('.primaryGraph').width(),
            data: electronicPanelData.data,
            el: '.primaryGraph'
        };

        var BusVoltageGraphOptions = {
            xAxisId: 'Spacecraft_Time',
            xAxisName: 'Spacecraft Time',
            xAxisUnit: 'sec',
            yAxisId: 'Bus_Volt',
            yAxisName: 'Bus Voltage',
            yAxisUnit: 'V',
            width: this.$el.find('.secondaryGraph').width(),
            data: electronicPanelData.data,
            el: '.secondaryGraph'
        };

        lineGraph.init(SolarArrayGraphOptions);
        lineGraph.init(BusVoltageGraphOptions);
    }
};
