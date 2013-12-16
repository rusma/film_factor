'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('bubbleChart', function() {
    return {
            restrict: 'A', // Directive Scope is Attribute
            link: function (scope, elem, attrs) {
                // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
                nv.addGraph(function() {
                    var chart = nv.models.scatterChart()
                                .width(600)
                                .height(600)
                                .showXAxis(false)
                                .showYAxis(false)
                                .forceX([-100,100])
                                .forceY([-100,100])
                                .tooltips(true)
                                .color(d3.scale.category10().range())
                                .showLegend(true)
                                .tooltipContent(function(key, y, e, graph){
                                    return graph.point.title + " <br> Rating: " + graph.point.rating;
                                });

                    // var tickMarks = [0, -50, 50, 100];

                    // chart.xAxis
                    //     .tickValues(tickMarks)
                    //     .tickFormat(function(d){ return d });
                    // chart.yAxis
                    //     .tickValues(tickMarks)
                    //     .tickFormat(function(d){ return d });

                    d3.select(elem[0])
                        .datum(scope.generateRandomGenreMoviesData())
                          .transition().duration(1000)
                    .call(chart);

                    scope.getGenreMovies().then(function(data){
                        d3.select(elem[0])
                            .datum(data)
                              .transition().duration(2000)
                        .call(chart);
                    });


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
