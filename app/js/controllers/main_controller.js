'use strict';

/* MAIN CONTROLLER */

/**** THIS CONTROLLER DEALS WITH EVENTS AND SETTING UP THE GRAPH****/

angular.module('film_factor.controllers', []).
    controller('main_controller', ['$scope', 'maiVCApiService', 'localStorageService',
        function($scope, maiVCApiService, localStorageService) {
            $scope.chart = null;

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
                                .color(﻿["CD4A4A", "FD5E53","EA7E5D","FF8243","D68A59","FFA343","8A795D",
                                    "FCE883","FDFC74","1DF914","1CAC78","17806D","80DAEB","9ACEEB",
                                    "C5D0E6","ADADD6","CDA4DE","FF1DCE","6E5160","F75394","DE5D83","EE204D"])
                                .tooltipContent(function(key, y, e, graph){
                                    return graph.point.title +
                                    " <br> Rating: " + graph.point.rating +
                                    "<br> " + graph.point.genre;
                                });

                     nv.utils.windowResize($scope.chart.update);

                     //deffered resolve
                     dfrd.resolve();
                });

                return dfrd.promise();
            };

            $scope.renderChart = function(graph_elem, data) {
                d3.select(graph_elem)
                    .datum(data)
                      .transition().duration(800)
                .call($scope.chart);

                $scope.transformLegend();
            };

            //TO DO: add comments to this fucntion
            $scope.transformLegend = function() {
                var translate_x,
                    translate_y,
                    new_translate_y

                for(var i = 0; i < 16; i++) {
                    translate_x = 0;
                    translate_y = 18 * i;

                    if(i > 8){
                        new_translate_y = i;
                        new_translate_y -= 7;

                        translate_y = new_translate_y * 18;
                        translate_x = 75;
                    }

                    d3.select(".nv-series:nth-child(" + i + ")")
                        .attr("transform", "translate("+ translate_x + "," + translate_y + ")");
                }
            };

            $scope.changeGenre = function() {
                $scope.$broadcast('clickedRadioSubfactor', 'with this', 'and this argument');
            };
        }]);