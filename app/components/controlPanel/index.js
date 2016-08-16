 'use strict';
 var $ = require('jquery');
 var helpers = require('../utilities/handlebars/helpers.js');
 var tmpl = require("./tmpl.html");


 var parameterJSON = [{
     "name": "Electrical",
     "value": "electrical"
 }, {
     "name": "Thermal",
     "value": "thermal"
 }, {
     "name": "AOCS",
     "value": "aocs"
 }, {
     "name": "Camera",
     "value": "camera"
 }];

 module.exports = {
     init: function() {
         var template = helpers.compile(tmpl);
         return template({ parameterJSON });
     }
 };
