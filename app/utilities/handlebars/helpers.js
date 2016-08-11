'use strict';

var Handlebars = require('handlebars');

Handlebars.registerHelper('checkClause', function(expectedValue, actualValue, successValue, failureValue) {
    return expectedValue === actualValue ? successValue : failureValue;
});

module.exports = Handlebars;
