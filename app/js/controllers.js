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

                var coordinates = $scope.getXandYForRatingAndFactor(i, Math.random(0,100), groups);
                for (var j = 0; j < 50; j++) {
                    
                    data[i].values.push({
                        x: coordinates.x,
                        y: coordinates.y,
                        size: Math.random()
                   //, shape: shapes[j % 6]
                    });
                }
            }

            // data.push({
            //        key: 'Genre 0',
            //        values: []
            //     });

            // var coordinates = $scope.getXandYForRatingAndFactor(6, 20, groups);
            // data[0].values.push({
            //             x: coordinates.x,
            //             y: coordinates.y,
            //             size: 30
            //        //, shape: shapes[j % 6]
            //         });


            //    data.push({
            //        key: 'Genre 1',
            //        values: []
            //     });

            // var coordinates = $scope.getXandYForRatingAndFactor(11, 90, groups);
            // data[1].values.push({
            //             x: coordinates.x,
            //             y: coordinates.y,
            //             size: 10
            //        //, shape: shapes[j % 6]
            //         });

            //      data.push({
            //        key: 'Genre 2',
            //        values: []
            //     });

            // var coordinates = $scope.getXandYForRatingAndFactor(18, 90, groups);
            // data[2].values.push({
            //             x: coordinates.x,
            //             y: coordinates.y,
            //             size: 20
            //        //, shape: shapes[j % 6]
            //         });
            // console.log(data);
            return data;
        };

        $scope.getXandYForRatingAndFactor = function(group_index, rating, group_length) {
            console.log(rating);

            var degrees_for_group = 360 / group_length;
             //16.363636363636363 controllers.js:67

            console.log('d f group ' + degrees_for_group)

            var location = degrees_for_group * group_index;
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