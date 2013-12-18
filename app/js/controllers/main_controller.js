'use strict';

/* MAIN CONTROLLER */

/**** THIS CONTROLLER DEALS WITH EVENTS AND SETTING UP THE GRAPH****/

angular.module('film_factor.controllers', []).
    controller('main_controller', function($scope, maiVCApiService, localStorageService) {
        // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
        $scope.chart = null;

        $scope.initChart = function() {
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

                 dfrd.resolve();
            });

            return dfrd.promise();
        };

        $scope.renderChart = function(graph_elem, data) {
            d3.select(graph_elem)
                .datum(data)
                  .transition().duration(800)
            .call($scope.chart);
            for(var i = 0; i<16; i++){
	                 var translateX = 0;
	                 var translateY = 18 * i;
	                 
	                 if(i > 8){
		                var newY = i;
		                newY -= 7;
		                translateY = newY * 18;
		                translateX = 75;
	                 }
	                 
	                 console.log(translateX)
	                 console.log(translateY)
	                 console.log(d3.select(".nv-series:nth-child(1)"));
	                 d3.select(".nv-series:nth-child("+i+")")
					 	.attr("transform", "translate("+translateX+","+translateY+")");
                 }     
			
        };

   	});