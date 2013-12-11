'use strict';

/* Controllers */

angular.module('film_factor.controllers', []).
    controller('film_factor_controller', function($scope, maiVCApiService, localStorageService) {
        $scope.loadGenre = function() {
            var dfrd = $.Deferred();

            console.log(localStorageService.get('topscorersPL'));
            if(localStorageService.get('localStorageKey') !== null) {
                maiVCApiService.getGenreData().success(function(response){
                    if(response.length != 0 || response.error != null) {
                        localStorageService.add('genreData',response);
                        dfrd.resolve(response);
                    }
                });
            } else {
                var response = localStorageService.get('genreData');
                dfrd.resolve(response);
            }

            return dfrd.promise();
        }
   	});