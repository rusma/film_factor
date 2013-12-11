'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('bubbleChart', function() {
    return {
            restrict: 'A', // Directive Scope is Attribute
            link: function (scope, elem, attrs) {
                // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
                console.log(elem);
                nv.addGraph(function() {
                    var index = 2;
                    var chart = nv.models.scatterChart()
                                .width(600)
                                .height(600)
                                .showXAxis(true)
                                .showYAxis(true)
                                .forceX([-100,100])
                                .forceY([-100,100])
                                .tooltips(true)
                                .showLegend(false)
                                .tooltipContent(function(){
                                    return 'clock';
                                });
                                //.color(d3.scale.category10().range());

                    var tickMarks = [0, -50, 50, 100];

                    chart.xAxis
                        .tickValues(tickMarks)
                        .tickFormat(function(d){ return d });

                            chart.yAxis
                        .tickValues(tickMarks)
                        .tickFormat(function(d){ return d });

                    // animation example
                    d3.select(elem[0])
                        .datum(scope.getGenreData())
                          .transition().duration(1200)
                    .call(chart);

                    //  d3.select(elem[0])
                    //     .datum(aap(2,20))
                    //       .transition().duration(1200)
                    // .call(chart);

                    nv.utils.windowResize(chart.update);    

                    return chart; 
                }); 
            }
       }
    });
