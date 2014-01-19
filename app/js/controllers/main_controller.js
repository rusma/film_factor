'use strict';

/* MAIN CONTROLLER */

/**** THIS CONTROLLER DEALS WITH EVENTS AND SETTING UP THE GRAPH****/

angular.module('film_factor.controllers', []).
    controller('main_controller', ['$scope', 'maiVCApiService', 'localStorageService',
        function($scope, maiVCApiService, localStorageService) {
            $scope.chart = null;
            $scope.critics_status = 'off'
            $scope.audience_status = 'off';
            $scope.svg_elem = null;

            $scope.initChart = function() {
                //use deffered to deal with async
                var dfrd = $.Deferred();

                nv.addGraph(function() {
                    $scope.chart = nv.models.scatterChart()
                                .width(600)
                                .height(600)
                                .showXAxis(false)
                                .showYAxis(false)
                                .forceX([-100,100])
                                .forceY([-100,100])
                                .tooltips(true)
                                .showLegend(true)
                                // .color(﻿["FF7548", "CF7E56","FF9A4B","F9E28A","0BF956","14A372","335DE6",
                                // "7BD5E6","7077B7","FF3ACA","7A3DAC","DF6F8F","EB4847","98000B",
                                // "B2B2B2","FFFFFF"])
                                .tooltipContent(function(key, y, e, graph){
                                    console.log(key, graph);
                                    return "<div class='tooltip'><p class='title-tooltip'>" + graph.point.title +
                                    "</p><br><p class='rating-tooltip'> Rating: " + graph.point.rating +
                                    "</p><br><p class='genre-tooltip'>" + graph.point.genre +
                                    "</p><br><p class='runtime'>" + graph.point.runtime + "</p><img src='" + graph.point.poster +"'></div>";

                                });

                     nv.utils.windowResize($scope.chart.update);

                     //deffered resolve
                     dfrd.resolve();

                });

                return dfrd.promise();
            };

            $scope.renderChart = function(data, graph_elem) {
                console.log('render chart', data);
                //after the first time passing the graph_elem is not required anymore


                //CHECK WHETHER WHAT KIND OF RATING IS TURNED ON
                if($scope.svg_elem === null) {
                    d3.select(graph_elem)
                    //contetenated for now
                    .datum(data.audience.concat(data.critics))
                          .transition().duration(800)
                    .call($scope.chart);

                    $scope.svg_elem = graph_elem;
                } else {
                    d3.select($scope.svg_elem)
                    .datum(data)
                          .transition().duration(800)
                    .call($scope.chart);
                }


            };

            $scope.changeSubfactor = function(type) {
                //pass the renderchart function along so the graph_data_controller can call
                //it with new data
                $scope.$broadcast('clickedRadioSubfactor', type, $scope.renderChart);
            };


            //trigger audience or critics on or off
            //@type = audience/critics
            //@status = on or off
            $scope.triggerRatingType = function(type, status) {
                console.log(type, status);
            }
        }]);