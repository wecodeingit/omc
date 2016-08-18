 'use strict';
 var joint = require('joint');
 var graph = new joint.dia.Graph();


 module.exports = {
     init: function($el) {
         var paper = new joint.dia.Paper({
             el: $el,
             width: 400,
             height: 40,
             model: graph,
             gridSize: 1
         });

         var rect = new joint.shapes.basic.Rect({
             position: { x: 0, y: 10 },
             size: { width: 100, height: 30 },
             attrs: { rect: { fill: 'black' } }
         });

         var rect2 = rect.clone();
         rect2.translate(300);

         var link = new joint.dia.Link({
             source: { id: rect.id },
             target: { id: rect2.id }
         });

         graph.addCells([rect, rect2, link]);

     }
 };
