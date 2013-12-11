'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('bubbleChart', function() {
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
                console.log(elem);
                nv.addGraph(function() {
                    var index = 2;
                    var x = 200;
                    var y = 10;
                    var chart = nv.models.scatterChart()
                                .showXAxis(false)
                                .showYAxis(false)
                                .tooltips(true)
                                .width(1000)
                                .height(500)
                                .tooltipContent(function(){
                                    return 'cock';
                                })
                                .color(d3.scale.category10().range());


                    // animation example
                    d3.select(elem[0])
                        .datum(aap(2,40))
                          .transition().duration(1200)
                    .call(chart);

                     d3.select(elem[0])
                        .datum(aap(2,20))
                          .transition().duration(1200)
                    .call(chart);

                    nv.utils.windowResize(chart.update);    

                    return chart; 
                }); 

                var aap = function randomData(groups, points) { //# groups,# points per group
                   var data = [],
                       shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                       random = d3.random.normal();
                 
                    for (var i = 0; i < groups; i++) {
                         data.push({
                           key: 'Group ' + i,
                           values: []
                         });
                     
                    for (var j = 0; j < points; j++) {
                       data[i].values.push({
                         x: random()
                       , y: random()
                       , size: Math.random()
                       //, shape: shapes[j % 6]
                       });
                     }
                   }
             
               return data;
             }
               
           }
       }
    });
