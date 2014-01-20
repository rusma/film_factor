'use strict';

/* MAIN CONTROLLER */

/**** THIS CONTROLLER DEALS WITH EVENTS AND SETTING UP THE GRAPH****/

angular.module('film_factor.controllers', []).
    controller('main_controller', ['$scope', 'maiVCApiService', 'localStorageService',
        function($scope, maiVCApiService, localStorageService) {
            $scope.chart = null;
            $scope.svg_elem = null;
            $scope.active_data = null;

            $scope.initChart = function() {

                //set local storage to null to get new movies each refresh
                localStorageService.set('genre', null);
                localStorageService.set('runtime', null);
                localStorageService.set('release_theater', null);
                localStorageService.set('char', null);
                localStorageService.set('studio', null);

                //use deffered to deal with async graph rendering
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
                                    return "<div class='tooltip'><div class='title-tooltip'><div class='information-tooltip'>Selected Movie</div>" + graph.point.title +
                                    "</div><p class='rating-tooltip'> Rating: " + graph.point.rating +
                                    " / 100 </p><p class='genre-tooltip'>" + graph.point.genre +
                                    "</p><p class='runtime'>" + graph.point.runtime + " min</p><img src='" + graph.point.poster +"'></div>";
                                });
								
                     nv.utils.windowResize($scope.chart.update);
					 
                     dfrd.resolve();

                });

                return dfrd.promise();
            };

            //this function is for every time a new subfactor is chosen
            //by default it starts with the audience rating
            $scope.renderChart = function(data, graph_elem) {
                console.log('render chart', data);
                //after the first time passing the graph_elem is not required anymore
                var selected_svg_elem;

                //to switch later on between audience and critics
                $scope.active_data = data;

                if($scope.svg_elem === null) {
                    selected_svg_elem = d3.select(graph_elem)
                    $scope.svg_elem = graph_elem;
                } else {
                   selected_svg_elem = d3.select($scope.svg_elem)
                }

                //start with audience
                selected_svg_elem.datum(data.audience)
                    .transition().duration(800)
                    .call($scope.chart);
            };

            $scope.renderRatingType = function(type) {
                var selected_svg_elem = d3.select($scope.svg_elem),
                    selected_svg_elem_with_data;

                if(type === 'audience') {
                    selected_svg_elem_with_data = selected_svg_elem.datum($scope.active_data.audience);
                } else if(type === 'critics') {
                    selected_svg_elem_with_data = selected_svg_elem.datum($scope.active_data.critics);
                }

                selected_svg_elem_with_data.transition().duration(1500)
                    .call($scope.chart);
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
                $scope.renderRatingType(type);
            };
        }]);