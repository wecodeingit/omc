 'use strict';
 var d3 = require('d3');

 function Tooltip(options, svg) {
     this.options = options;
     this.svg = svg;
     this.tooltip = this.createTooltip();

 }
 Tooltip.prototype = {
     createTooltip: function() {
         this.bindEvents();
         var tooltip = d3.select("body").append("div")
             .attr("class", "tooltip bs-tether-element bs-tether-element-attached-top fade bs-tether-enabled in")
             .style("opacity", 0);

         tooltip.append("div").attr("class", "tooltip-arrow");
         return tooltip;
     },
     bindEvents: function() {
         var self = this;
         this.svg.selectAll("circle").on("mouseover", function(d) {
             self.tooltip.transition()
                 .duration(200)
                 .style("opacity", 0.9);
             self.renderTooltipContent(d);
             self.positionTooltip();


         }).on("mouseout", function(d) {
             self.tooltip.transition()
                 .duration(200)
                 .style("opacity", 0);

         });

     },
     setHTML: function(d) {
         var tmpl = "<div>" + this.options.xAxisName +
             "<span> ( " + this.options.xAxisUnit + " ) </span>" +
             "</div>" +
             "<div>" + d[this.options.xAxisId] + "</div>" +
             "<div>" + this.options.yAxisName +
             "<span> ( " + this.options.yAxisUnit + " ) </span>" +
             "</div>" +
             "<div>" + d[this.options.yAxisId] + "</div>";
         d3.selectAll('.tooltip-inner').html(tmpl);
     },

     renderTooltipContent: function(d) {
         var self = this;
         d3.selectAll('.tooltip-inner').remove();
         this.tooltip.append('div')
             .attr('class', 'tooltip-inner');
         this.setHTML(d);
     },

     getTooltipDimension: function() {
         return {
             width: this.tooltip.node().getBoundingClientRect().width,
             height: this.tooltip.node().getBoundingClientRect().height
         };
     },

     positionTooltip: function() {
         this.tooltip.style("left", (d3.event.pageX) - (this.getTooltipDimension().width * 0.5) + "px")
             .style("top", (d3.event.pageY) - (this.getTooltipDimension().height + 10) + "px");
     },

     showTooltip: function() {
         this.tooltip.transition()
             .duration(200)
             .style("opacity", 0.9)
             .call(this.renderTooltipContent)
             .call(this.positionTooltip);
     }
 };

 module.exports = Tooltip;
