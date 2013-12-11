'use strict';

/* Controllers */

angular.module('film_factor.controllers', []).
    controller('film_factor_controller', function($scope, maiVCApiService, localStorageService) {
        $scope.getGenreData = function() {
            // var dfrd = $.Deferred();

            // console.log(localStorageService.get('topscorersPL'));
            // if(localStorageService.get('localStorageKey') !== null) {
            //     maiVCApiService.getGenreData().success(function(response){
            //         if(response.length != 0 || response.error != null) {
            //             localStorageService.add('genreData',response);
            //             dfrd.resolve(response);
            //         }
            //     });
            // } else {
            //     var response = localStorageService.get('genreData');
            //     dfrd.resolve(response);
            // }

            // return dfrd.promise();

            var data = [],
               shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
               groups = 22;

                 
            for (var i = 0; i <= groups; i++) {
                data.push({
                   key: 'Genre ' + i,
                   values: []
                });

                
                for (var j = 0; j < 50; j++) {
                    var coordinates = $scope.getXandYForRatingAndFactor(i, Math.floor(Math.random() * 100) +1, groups);  
                    data[i].values.push({
                        x: coordinates.x,
                        y: coordinates.y,
                        size: 1
                   //, shape: shapes[j % 6]
                    });
                }
            }
            return data;
        };

        $scope.getXandYForRatingAndFactor = function(group_index, rating, group_length) {
            console.log(rating);

            var degrees_for_group = 360 / group_length;
             //16.363636363636363 controllers.js:67

            console.log('d f group ' + degrees_for_group)
            var end_of_group = Math.random() * (degrees_for_group * 2);

            console.log(degrees_for_group, end_of_group);
            var location = (Math.floor( end_of_group ) + ( degrees_for_group ) ) * group_index;
            console.log('location ' + location )
            //location 98.18181818181819 
            var pi = Math.PI;
            var x = Math.sin(location * pi / 180) * ((rating -100) * -1);
            console.log(x)

            var y = Math.cos(location * pi / 180) * ((rating -100) * -1);
            console.log(x, y);
            return {x: x, y: y};
           
        };

   	});