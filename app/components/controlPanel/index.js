 'use strict';

 var helpers = require('../../utilities/handlebars/helpers.js');
 var controlPanelTmpl = require("./controlPanelTmpl.html");
 var missionInformationTmpl = require("./missionInformationTmpl.html");
 var commandStatusTmpl = require("./commandStatusTmpl.html");

 module.exports = {
     init: function(data) {

         this.loadAllPanels(data);
         $(document).on("emit:plot-data", this.loadAllPanelsOnInteraction.bind(this));
     },
     loadAllPanelsOnInteraction: function(event, data) {
         this.loadAllPanels(data);
     },
     loadAllPanels: function(data) {
         this.loadControlPanel(data);
         this.loadMissionInformation(data);
         this.loadCommandStatus(data);
     },
     loadPanel: function(options) {
         var template = helpers.compile(options.template);
         $(options.el).html(template(options.data));
     },
     loadControlPanel: function(data) {
         this.loadPanel({
             template: controlPanelTmpl,
             el: $('.tab-pane.active').find('.controlPanel'),
             data: data
         });
     },
     loadMissionInformation: function(data) {
         this.loadPanel({
             template: missionInformationTmpl,
             el: '.missionInformation',
             data: data
         });
     },
     loadCommandStatus: function(data) {
         this.loadPanel({
             template: commandStatusTmpl,
             el: '.commandStatus',
             data: data
         });
     }
 };
