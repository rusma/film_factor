'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('angulard3BarGraph', function() {
      
     
    return {
            restrict: 'A', // Directive Scope is Attribute
            scope: {
                datajson: '=',
                xaxisName: '=',
                xaxisPos: '=',
                yaxisName: '=',
                yaxisPos: '=',
                d3Format: '=',
                // All the Angular Directive Vaiables used as d3.js parameters
            },
            link: function (scope, elem, attrs) {
                // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
               var margin = {top: 20, right: 20, bottom: 30, left: 50},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

               var formatPercent = d3.format(scope.d3Format); // formatting via angular variable

               var x = d3.scale.ordinal()
                       .rangeRoundBands([0, width], .1);

               var y = d3.scale.linear()
                       .range([height, 0]);

               var xAxis = d3.svg.axis()
                       .scale(x)
                       .orient("bottom");

               var yAxis = d3.svg.axis()
                       .scale(y)
                       .orient("left")
                       .tickFormat(formatPercent);

               var svg = d3.select("#"+elem[0].id).append("svg") // selecting the DOM element by d3.js 
                                                                 // - getting from Angular context   
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              d3.json(scope.datajson, function(error, data) { // external data filename- angular directive variable
                  if (error) {
                      return console.warn(error);
                  }
                  
            // this are the percentages on y, yes y dont know how
                  x.domain(function(){ 
                  	for(var i = 0; i++; i<11) {
                        return i;
                    }
                  });
        
                  //this doesnt work for what should be the y axis
//                  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                      .append("text")
                          .attr("x", scope.xaxisPos)
                          .attr("dx", ".71em")
                          .style("text-anchor", "end")
                          .text(scope.xaxisName);
                  // x axis legend setting from angular variables
                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                      .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", scope.yaxisPos)
                          .attr("dy", ".71em")
                          .style("text-anchor", "end")
                          .text(scope.yaxisName);
              	
                  svg.append('defs')
                  .append('pattern')
                    .attr('id', 'diagonalHatch')
                    .attr('patternUnits', 'userSpaceOnUse')
                    .attr('width', 100)
                    .attr('height', 100)
                  .append("svg:image")
                      .attr("xlink:href", "http://www.e-pint.com/epint.jpg")
                      .attr("width", 100)
                      .attr("height", 200)
                      .attr("x", 0)
                      .attr("y", 0);
                 
                  
                  // y axis legend setting from angular variables
                  svg.selectAll(".bar")
                      .data(data)
                      .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { return x(d.letter); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return y(d.frequency); })
                      .attr("height", function(d) { return height - y(d.frequency); })
                        .on('click', function(d, i) {
                      		console.log("click");
                        });
                  });
                
                  svg.append("rect")
                      .attr("x", 10)
                      .attr("y", 120.66367501180912)
                      .attr("width", 100)
                      .attr("height", 100)
                      .style('fill', 'url(#diagonalHatch)');
              },
               
           }
       });
