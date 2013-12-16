'use strict';

/* Controllers */

angular.module('film_factor.controllers', []).
    controller('film_factor_controller', function($scope, maiVCApiService, localStorageService) {
        $scope.getGenreMovies = function() {
            var dfrd = $.Deferred();

            if(localStorageService.get('genreMovies') === null) {
                maiVCApiService.getGenreMovies().success(function(response){
                    if(response.length != 0 || response.error != null) {
                        localStorageService.add('genreMovies', response);
                        var processedGenreMovies = $scope.processGenreMovies(response);
                        dfrd.resolve(processedGenreMovies);
                    }
                });
            } else {
                var response = localStorageService.get('genreMovies');
                var processedGenreMovies = $scope.processGenreMovies(response);
                dfrd.resolve(processedGenreMovies);
            }

            return dfrd.promise();
        };

        $scope.processGenreMovies = function(unfiltered_movie_data) {
            var movies = [];
            var genres = {
                1: "erotic",
                2: "horror",
                4: "romance",
                6: "comedy",
                7: "drama",
                8: "kids-family",
                9: "science-fiction-fantasy",
                10: "fantasy",
                11: "action-adventure",
                12: "action",
                13: "crime",
                14: "family",
                16: "thriller",
                17: "advendture",
                18: "science-fiction"
            };


            //only works in modern browsers
            var group_length = ( Object.keys(genres).length ) ? Object.keys(genres).length : 15;

            //create array index for each genre in movies array
            //this will contain our filtered data with x and y etc
            _.each(genres, function(val, key){
                movies.push({
                   id: key,
                   key: 'Genre ' + val,

                   values: []
                });
            });

            //giant loop structur
            _.each(unfiltered_movie_data, function(unfiltered_movie_data_val, unfiltered_movie_key){

                //check if the unfiltered data has genres
                if(unfiltered_movie_data_val.genres !== '[]'){

                    //loop through the empty just created movies genre
                    _.each(movies, function(movie_val, movie_key) {
                        //check if there is a rating
                        if(unfiltered_movie_data_val.rating_tmdb_audience === 0 ||
                            unfiltered_movie_data_val.rating_tmdb_audience === '') {
                            return false;
                        }
                        //if there is add a value to the genre in which the unfiltered movie belongs
                        _.each(unfiltered_movie_data_val.genres, function(val, index){
                            if(val === parseInt(movie_val.id)) {
                                var coordinates = $scope.getXandYForRatingAndFactor(movie_val.id, unfiltered_movie_data_val.rating_tmdb_audience, group_length);
                                movie_val.values.push({
                                    x: coordinates.x,
                                    y: coordinates.y,
                                    size: 1,
                                    title: unfiltered_movie_data_val.title,
                                    rating: unfiltered_movie_data_val.rating_tmdb_audience,
                                });
                            }
                        });
                    });
                }
            });


            return movies;
        },

        $scope.generateRandomData = function() {
            var movies = [];

            var genres = {
                1: "erotic",
                2: "horror",
                4: "romance",
                6: "comedy",
                7: "drama",
                8: "kids-family",
                9: "science-fiction-fantasy",
                10: "fantasy",
                11: "action-adventure",
                12: "action",
                13: "crime",
                14: "family",
                16: "thriller",
                17: "advendture",
                18: "science-fiction"
            };

            var group_length = ( Object.keys(genres).length ) ? Object.keys(genres).length : 15;

              _.each(genres, function(val, key){
                    movies.push({
                       id: key,
                       key: 'Genre ' + val,

                       values: []
                    });
                });


                for(var i in movies) {
                    for (var j = 0; j < 50; j++) {
                        var coordinates = $scope.getXandYForRatingAndFactor(i, Math.random(0,100), group_length);
                        movies[i].values.push({
                            x: coordinates.x,
                            y: coordinates.y,
                            size: 1
                            //, shape: shapes[j % 6]
                        });
                    }
                }

                console.log(movies);
                return movies;
            },

        $scope.getXandYForRatingAndFactor = function(group_index, rating, group_length) {
            var degrees_for_group = 360 / group_length;
             //16.363636363636363 controllers.js:67

            // console.log('d f group ' + degrees_for_group)
            var end_of_group = Math.random() * (degrees_for_group * 2);

            // console.log(degrees_for_group, end_of_group);
            var location = (Math.floor( end_of_group ) + ( degrees_for_group ) ) * group_index;
            // console.log('location ' + location )
            //location 98.18181818181819
            var pi = Math.PI;
            var x = Math.sin(location * pi / 180) * ((rating -100) * -1);
            // console.log(x)

            var y = Math.cos(location * pi / 180) * ((rating -100) * -1);
            // console.log(x, y);
            return {x: x, y: y};

        };

        $scope.randomData

   	});