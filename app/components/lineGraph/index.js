 'use strict';
 var d3 = require('d3');
 var chartTooltip = require('./chartTooltip');
 module.exports = {
     init: function(userOptions) {

         var defaultOptions = {
             xAxisId: '',
             xAxisName: 'x-Axis',
             yAxisId: '',
             yAxisName: 'y-Axis',
             xAxisUnit: '',
             yAxisUnit: '',
             data: {},
             isZoomEnabled: true,
             isTooltipEnbled: true,
             width: 400,
             height: 400,
             el: 'body',
             limits: []
         };

         var options = {};
         $.extend(options, defaultOptions, userOptions);

         var margin = { top: 20, right: 20, bottom: 50, left: 60 };
         var width = options.width - margin.left - margin.right;
         var height = options.height - margin.top - margin.bottom;
         var minScaleExtent = 0.9;
         var maxScaleExtent = 100;
         var numberOfXAxisLabels = 5;
         var numberOfYAxisLabels = 10;
         var formatYAxis = d3.format('.2f');
         var x = d3.scaleLinear().range([0, width]);
         var y = d3.scaleLinear().range([height, 0]);
         var xAxis = d3.axisBottom().scale(x).ticks(numberOfXAxisLabels);
         var yAxis = d3.axisLeft().scale(y).ticks(numberOfYAxisLabels).tickFormat(formatYAxis);
         var labelFontSize = 12;
         var strokeAnimationDuration = 30;
         var stowedColor = "#808080";
         var deployedColor = "#008000";



         var endall = function(transition, callback) {
             if (!callback) { callback = function() {}; }
             if (transition.size() === 0) { callback(); }
             var n = 0;
             transition
                 .each(function() {++n; })
                 .on("end", function() {
                     if (!--n) {
                         callback.apply(this, arguments);
                     }
                 });
         };

         var isTooltipEnbled = function() {
             return options.isTooltipEnbled && new chartTooltip(options, svg);

         };


         var zoom = d3.zoom().scaleExtent([minScaleExtent, maxScaleExtent]).on("zoom", function() {
             if (options.isZoomEnabled) {
                 svg.attr("transform", d3.event.transform);
             }
         });

         var svg = d3.select(options.el).append("svg")
             .attr("width", options.width)
             .attr("height", options.height)
             .call(zoom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


         x.domain(d3.extent(options.data, function(d) {
             return d[options.xAxisId];
         }));
         y.domain(d3.extent(options.data, function(d) {
             return d[options.yAxisId].toFixed(1);
         }));

         //drawing limit lines

         svg.selectAll("limit")
             .data(options.limits)
             .enter()
             .append("svg:line")
             .attr("x1", 0)
             .attr("x2", width)
             .attr("y1", function(d) {
                 return y(d.value);
             })
             .attr("y2", function(d) {
                 return y(d.value);
             })
             .style("stroke", function(d) {
                 return d.color;
             });

         svg.selectAll("legends")
             .data(options.limits)
             .enter()
             .append("text")
             .attr("x", width)
             .attr("y", function(d) {
                 return y(d.value) - 5;
             })
             .attr("text-anchor", "end")
             .text(function(d) {
                 return d.legend;
             });

         svg.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis);

         svg.append("g")
             .attr("class", "y axis")
             .call(yAxis);

         svg.append("text")
             .attr("class", "y label")
             .attr("text-anchor", "end")
             .attr("transform", "rotate(-90)")
             .style("font-size", labelFontSize)
             .attr("x", 0)
             .attr("y", (labelFontSize - margin.left))
             .text(options.yAxisName + " ( " + options.yAxisUnit + " )");

         svg.append("text")
             .attr("class", "x label")
             .attr("text-anchor", "end")
             .style("font-size", "12px")
             .attr("x", width)
             .attr("y", height + (margin.bottom - labelFontSize))
             .text(options.xAxisName + " ( " + options.xAxisUnit + " )");

         var x1 = function(d, i) {
             return x(d[options.xAxisId]);
         };

         var y1 = function(d, i) {
             return y(d[options.yAxisId]);
         };
         var x2 = function(d, i) {
             if (i < options.data.length - 1) {
                 return x(options.data[i + 1][options.xAxisId]);
             } else {
                 return x(d[options.xAxisId]);
             }
         };
         var y2 = function(d, i) {
             if (i < options.data.length - 1) {
                 return y(options.data[i + 1][options.yAxisId]);
             } else {
                 return y(d[options.yAxisId]);
             }
         };



         svg.selectAll("status")
             .data(options.data)
             .enter()
             .append("svg:line")
             .attr("class", "line")
             .attr("x1", x1)
             .attr("y1", y1)
             .attr("x2", x2)
             .attr("y2", y2)
             .transition()
             .delay(function(d, i) {
                 return i * strokeAnimationDuration;
             })
             .ease(d3.easeLinear)
             .style("stroke", function(d) {
                 return d.SolArray_Status.toLowerCase() === "stowed" ? stowedColor : deployedColor;
             });


         svg.selectAll("dot")
             .data(options.data)
             .enter().append("circle")
             .style('cursor', 'pointer')
             .attr("r", 0)
             .attr("cx", function(d) {
                 return x(d[options.xAxisId]);
             })
             .attr("cy", function(d) {
                 return y(d[options.yAxisId]);
             })
             .transition()
             .delay(strokeAnimationDuration * options.data.length)
             .ease(d3.easeLinear)
             .attr("r", 5)
             .call(endall, isTooltipEnbled);


         svg.selectAll("circle")
             .on("click", function(d) {
                 $.event.trigger("emit:plot-data", d);
             });

     }
 };
