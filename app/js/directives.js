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
                                .showLegend(true)
                                .color(﻿["CD4A4A", "FD5E53","EA7E5D","FF8243","D68A59","FFA343","8A795D","FCE883","FDFC74","1DF914","1CAC78","17806D","80DAEB","9ACEEB","C5D0E6","ADADD6","CDA4DE","FF1DCE","6E5160","F75394","DE5D83","EE204D"])
                                .tooltipContent(function(key, y, e, graph){
                                    return graph.point.title + " <br> Rating: " + graph.point.rating + "<br> " + graph.point.genre;
                                });
                    console.log(d3.scale.category20().range());
                    var tickMarks = [0, -50, 50, 100];

                    chart.xAxis
                        .tickValues(tickMarks)
                        .tickFormat(function(d){ return d });
                    chart.yAxis
                        .tickValues(tickMarks)
                        .tickFormat(function(d){ return d });

                    d3.select(elem[0])
                        .datum(scope.generateRandomGenreMoviesData())
                          .transition().duration(1500)
                    .call(chart);

                    scope.getGenreMovies().then(function(data){
                        d3.select(elem[0])
                            .datum(data)
                              .transition().duration(1000)
                        .call(chart);
                    });

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            }
       }
    });
