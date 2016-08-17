 'use strict';
 var $ = require('jquery');
 var d3 = require('d3');

 module.exports = {
     init: function(data, el, opts) {                    

        var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;        

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d[opts.x]); })
            .y(function(d) { return y(d[opts.y]); });

        var svg = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            

          x.domain(d3.extent(data, function(d) { return d[opts.x]; }));
          y.domain(d3.extent(data, function(d) { return d[opts.y]; }));

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
            .attr("r", 0)
            .attr("cx", function(d) { return x(d[opts.x]); })
            .attr("cy", function(d) { return y(d[opts.y]); })
            .transition()
            .delay(function(d,i){
                return i*200;
            })
            .duration(200)
            .ease("linear")
            .attr("r", 3.5);

        var totalLength = path.node().getTotalLength();

        path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(3000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
    }
 };
