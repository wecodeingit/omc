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
             limits : []
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
         var strokeAnimationDuration = 1000;

         var line = d3.line()
             .x(function(d) {
                 return x(d[options.xAxisId]);
             })
             .y(function(d) {
                 return y(d[options.yAxisId]);
             });

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

         svg.selectAll("g").call(zoom);
         x.domain(d3.extent(options.data, function(d) {
             return d[options.xAxisId];
         }));
         y.domain(d3.extent(options.data, function(d) {
             return d[options.yAxisId].toFixed(1);
         }));

         options.limits.forEach(function(item){
           svg.append("svg:line")
              .attr("x1", 0)
              .attr("x2", width)
              .attr("y1", y(item.value))
              .attr("y2", y(item.value))
              .style("stroke", item.color);

          svg.append("text")
              .attr("x", width)            
              .attr("y", y(item.value)-5)            
              .attr("text-anchor", "end")            
              .text(item.legend);
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

         var path = svg.append("path")
             .datum(options.data)
             .attr("class", "line")
             .attr("d", line);

         svg.selectAll("dot")
             .data(options.data)
             .enter().append("circle")
             .attr("r", 0)
             .attr("cx", function(d) {
                 return x(d[options.xAxisId]);
             })
             .attr("cy", function(d) {
                 return y(d[options.yAxisId]);
             })
             .transition()
             .delay(function(d, i) {
                 return strokeAnimationDuration;
             })
             .ease(d3.easeLinear)
             .attr("r", 5)
             .call(endall, isTooltipEnbled);         

            
         svg.selectAll("circle")
             .on("click", function(d) {
                 $.event.trigger("emit:plot-data", d);
             });

         var totalLength = path.node().getTotalLength();

         path
             .attr("stroke-dasharray", totalLength + " " + totalLength)
             .attr("stroke-dashoffset", totalLength)
             .transition()
             .duration(strokeAnimationDuration)
             .ease(d3.easeLinear)
             .attr("stroke-dashoffset", 0);

     }
 };
