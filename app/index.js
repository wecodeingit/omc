'use strict';
require('../css/main.css');
require('bootstrap/css/bootstrap.css');
var layout = require('./layout');
var threeDimensionalScene = require('./threeDimensionalScene');
var mimicDisplay = require("./mimicDisplay");

layout.init();
threeDimensionalScene.init({
    el: '#earthCanvas'
});
mimicDisplay.init();
