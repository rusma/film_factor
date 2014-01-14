'use strict';

/* MAIN CONTROLLER */

/**** THIS CONTROLLER DEALS WITH EVENTS AND SETTING UP THE GRAPH****/

angular.module('film_factor.controllers', []).
    controller('main_controller', ['$scope', 'maiVCApiService', 'localStorageService',
        function($scope, maiVCApiService, localStorageService) {
            $scope.chart = null;
            $scope.critics_status = 'off'
            $scope.audience_status = 'off';

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
                                    return graph.point.title +
                                    "<br> Rating: " + graph.point.rating +
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

                //$scope.transformLegend();

                $scope.chart.legend.dispatch.on('legendClick', function(e){
                    //$scope.transformLegend();
                });
            };

            //TO DO: add comments to this fucntion
            $scope.transformLegend = function() {
                d3.select(".nv-wrap").attr("transform", "translate(0, 0)");
             
                var translate_x,
                    translate_y;
                    
	                for(var i = 0; i<2; i++){
		                 translate_x = 0;
		                 translate_y = 18 * i;
		                 
	
		                 d3.select(".nv-series:nth-child("+i+")")
						 	.attr("transform", "translate("+translate_x+","+translate_y+")");
	                 }     
					 d3.select(".nv-legendWrap").attr("transform", "translate(530, 70)");

            };

            $scope.changeSubfactor = function(type) {
                //broadcast the need for new data, graph_data_controller will pick it up
                console.log(type);
                $scope.$broadcast('clickedRadioSubfactor', type);
            };

            //trigger audience or critics on or off
            //@type = audience/critics
            //@status = on or off
            $scope.triggerRatingType = function(type, status) {
                console.log(type, status);
            }
        }]);