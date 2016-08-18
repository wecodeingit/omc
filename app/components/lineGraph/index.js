 'use strict';
 var d3 = require('d3');

 module.exports = {
     init: function(data, el, opts) {
         var zoom = d3.zoom().scaleExtent([1, 100]).on("zoom", function() {
             svg.attr("transform", d3.event.transform);
         });
         var margin = { top: 20, right: 20, bottom: 20, left: 20 },
             width = 400 - margin.left - margin.right,
             height = 400 - margin.top - margin.bottom;

         var x = d3.scaleLinear().range([0, width]);


         var y = d3.scaleLinear()
             .range([height, 0]);

         var xAxis = d3.axisBottom()
             .scale(x);

         var yAxis = d3.axisLeft()
             .scale(y);

         var line = d3.line()
             .x(function(d) {
                 return x(d[opts.x]);
             })
             .y(function(d) {
                 return y(d[opts.y]);
             });

         var svg = d3.select(el).append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .call(zoom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

         var tooltip = d3.select("body").append("div")
             .attr("class", "tooltip bs-tether-element bs-tether-element-attached-top fade bs-tether-enabled in")
             .style("opacity", 0);

         tooltip.append("div")
             .attr("class", "tooltip-arrow");


         x.domain(d3.extent(data, function(d) {
             return d[opts.x];
         }));
         y.domain(d3.extent(data, function(d) {
             return d[opts.y];
         }));

         svg.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis);

         svg.append("g")
             .attr("class", "y axis")
             .call(yAxis)
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text(opts.legend);

         var path = svg.append("path")
             .datum(data)
             .attr("class", "line")
             .attr("d", line);

         // Add the scatterplot
         svg.selectAll("dot")
             .data(data)
             .enter().append("circle")
             .on("mouseover", function(d) {
                 tooltip.transition()
                     .duration(200)
                     .style("opacity", 0.9);
                 d3.selectAll('.tooltip-inner').remove();
                 tooltip.append('div').attr('class', 'tooltip-inner')
                     .html("<div>" + opts.x + "</div><div>" + d[opts.x] + "</div>" +
                         "<div>" + opts.y + "</div><div>" + d[opts.y] + "</div>");
                 tooltip.style("left", (d3.event.pageX) - (tooltip.node().getBoundingClientRect().width * 0.5) + "px")
                     .style("top", (d3.event.pageY) - (tooltip.node().getBoundingClientRect().height + 10) + "px");
             })
             .on("click", function(d) {
                 console.log(d);
             })
             .on("mouseout", function(d) {
                 tooltip.transition()
                     .duration(200)
                     .style("opacity", 0);

             })
             .attr("r", 5)
             .attr("cx", function(d) {
                 return x(d[opts.x]);
             })
             .attr("cy", function(d) {
                 return y(d[opts.y]);
             })
             .transition()
             .delay(function(d, i) {
                 return i * 200;
             })
             .duration(200)
             .ease(d3.easeLinear)
             .attr("r", 5);

         var totalLength = path.node().getTotalLength();

         path
             .attr("stroke-dasharray", totalLength + " " + totalLength)
             .attr("stroke-dashoffset", totalLength)
             .transition()
             .duration(3000)
             .ease(d3.easeLinear)
             .attr("stroke-dashoffset", 0);
     }
 };
