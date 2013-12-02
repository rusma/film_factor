'use strict';

/* Controllers */

angular.module('film_factor.controllers', []).
    controller('film_factor_controller', function($scope, statsfcApiService) {
        statsfcApiService.getTopScorers().success(function(response){
            if(response.length != 0 || response.error != null) {
//                console.log(response);
                $scope.topscorersList = [];

                $scope.topscorersList = response;
            } else {
                //provide placeholder
            }
        });
   	});