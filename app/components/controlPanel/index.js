 'use strict';
 var $ = require('jquery');
 var helpers = require('../../utilities/handlebars/helpers.js');
 var controlPanelTmpl = require("./controlPanelTmpl.html");
 var missionInformationTmpl = require("./missionInformationTmpl.html");
 var commandStatusTmpl = require("./commandStatusTmpl.html");

 module.exports = {
     init: function(data, $el) {
         this.loadControlPanel(data, $el);
         this.loadMissionInformation(data, $('.missionInformation'));
         this.loadCommandStatus(data, $('.commandStatus'));
     },
     loadControlPanel: function(data, $el) {
         var template = helpers.compile(controlPanelTmpl);
         $el.html(template(data));
     },
     loadMissionInformation: function(data, $el) {
         var template = helpers.compile(missionInformationTmpl);
         $el.html(template(data));
     },
     loadCommandStatus: function(data, $el) {
         var template = helpers.compile(commandStatusTmpl);
         $el.html(template(data));
     }
 };
