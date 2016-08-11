 'use strict';
 var $ = require('jquery');
 var joint = require('joint');
 var graph = new joint.dia.Graph();


 module.exports = {
     init: function() {
         var paper = new joint.dia.Paper({
             el: $('body'),
             width: 600,
             height: 200,
             model: graph,
             gridSize: 1
         });

         var rect = new joint.shapes.basic.Rect({
             position: { x: 100, y: 30 },
             size: { width: 100, height: 30 },
             attrs: { rect: { fill: 'blue' } }
         });


         var rect2 = rect.clone();
         rect2.translate(300);


         var link = new joint.dia.Link({
             source: { id: rect.id },
             target: { id: rect2.id }
         });

         graph.addCells([rect]);

     }
 };
