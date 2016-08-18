'use strict';
var tmpl = require("../utilities/components-layout/tmpl.html");
var helpers = require("../utilities/handlebars/helpers.js");
module.exports = {
    init: function(el) {
        var data = { title: "Thermal" };
        var template = helpers.compile(tmpl);
        $(el).html(template(data));
    }
};
