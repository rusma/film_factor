'use strict';

/* GRAPH DATA CONTROLLER */

/**** THIS CONTROLLER GETS THE DATA FOR ALL KIND OF FILTERS AND SUBFACTORS****/

angular.module('film_factor.controllers').
    controller('graph_data_controller', ['$scope', 'maiVCApiService', 'localStorageService',

        function($scope, maiVCApiService, localStorageService) {
            $scope.active_subfactor = 'genre';
            $scope.$on('clickedRadioSubfactor', getNewSubfactorData);

            $scope.genres = {
	            0: {"genre_id": 1, "genre": "action"},
	            1: {"genre_id": 2, "genre": "adventure"},
	            2: {"genre_id": 4, "genre": "animation"},
	            3: {"genre_id": 6, "genre": "comedy"},
	            4: {"genre_id": 7, "genre": "crime"},
	            5: {"genre_id": 8, "genre": "drama"},
	            6: {"genre_id": 9, "genre": "family"},
	            7: {"genre_id": 10, "genre": "fantasy"},
	            8: {"genre_id": 11, "genre": "horror"},
	            9: {"genre_id": 12, "genre": "kids & family"},
	            10: {"genre_id": 13, "genre": "romance"},
	            11: {"genre_id": 14, "genre": "science-fiction"},
	            12: {"genre_id": 16, "genre": "thriller"},
	            13: {"genre_id": 17, "genre": "western"},
	            14: {"genre_id": 18, "genre": "war"},
                15: {"genre_id": 23, "genre": "sport and fitness"}
	      
	        };

            //PLAIN MOVIE-GENRE DATA

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

            $scope.getLengthMovies = function() {
                var dfrd = $.Deferred();
                console.log('get length movies');

                if(localStorageService.get('lengthMovies') === null) {

                }
            };

            $scope.getReleaseDateMovies = function() {
                var dfrd = $.Deferred();
                console.log('get releasedate movies');

                if(localStorageService.get('releaseDateMovies') === null) {

                }

            };  

            $scope.processGenreMovies = function(unfiltered_movie_data) {
                console.log(unfiltered_movie_data);
                var movies = [];
                var genres = $scope.genres;

                //only works in modern browsers
                var group_length = ( Object.keys(genres).length ) ? Object.keys(genres).length : 16;

                //create array index for each genre in movies array
                //this will contain our filtered data with x and y etc

                _.each(genres, function(val, key){

                    movies.push({
                        key: val.genre,
                        values: [],
                        data: val,
                        id: key,
                    });
                });

                //giant loop structure - performance intensive - figure something else for this
                _.each(unfiltered_movie_data, function(unfiltered_movie_data_val, unfiltered_movie_key){

                    //check if the unfiltered data has genres
                    if(unfiltered_movie_data_val.genres !== '[]'){

                        //loop through the empty just created movies genre
                        _.each(movies, function(movie_val, movie_key) {
                            //check if there is a rating
                            if(unfiltered_movie_data_val.rating_tmdb_audience === 0 ||
                                unfiltered_movie_data_val.rating_tmdb_audience === '') {
                                return false;
                            } else {
                                //if there is add a value to the genre in which the unfiltered movie belongs
                                _.each(unfiltered_movie_data_val.genres, function(val, index){
                                    // console.log(val, movie_val.key.genre_id);
                                    if(val === parseInt(movie_val.data.genre_id)) {
                                        var coordinates = $scope.getXandYForRatingAndFactor(movie_val.id, unfiltered_movie_data_val.rating_tmdb_audience, group_length);
                                        movie_val.values.push({
                                            x: coordinates.x,
                                            y: coordinates.y,
                                            size: 1,
                                            title: unfiltered_movie_data_val.title,
                                            rating: unfiltered_movie_data_val.rating_tmdb_audience,
                                            genre: movie_val.data.genre
                                        });
                                        
                                    }
                                });
                            }
                        });
                    }
                });

                console.log(movies);

                return movies;
            };

            /*** MISC FUNCTIONS ****/

            $scope.generateRandomGenreMoviesData = function() {
                var movies = [],
                    genres = $scope.genres,
                    //this only works in not IE
                    group_length = ( Object.keys(genres).length ) ? Object.keys(genres).length : 15;

                  _.each(genres, function(val, key){
                        movies.push({
                           id: key,
                           key: val.genre,
                           values: []
                        });
                    });

                    for(var i in movies) {
                        for (var j = 0; j < 20; j++) {
                            var coordinates = $scope.getXandYForRatingAndFactor(i, Math.floor(Math.random() * 100) + 1, group_length);
                            movies[i].values.push({
                                x: coordinates.x,
                                y: coordinates.y,
                                size: 2
                                //, shape: shapes[j % 6]
                            });
                        }
                    }

                    return movies;
            };

            $scope.getXandYForRatingAndFactor = function(group_index, rating, group_length) {
                //console.log(group_index, rating, group_length);

                // console.log(group_index, rating, group_length);
                var degrees_for_group = 360 / group_length;
                 //16.363636363636363 controllers.js:67

    			 // calculate the end of a group (multiple amount of degrees with the group index + 1 times the degrees)
                var end_of_group = (degrees_for_group * group_index) + degrees_for_group;

    			// Calculate the beginning of the group ( multiple amount of degrees with the group index)
    			var begin_of_group = degrees_for_group * group_index;

    			// location randomnly between twe beginning and end of a group.
                var location = Math.random() * (begin_of_group - end_of_group + 1) + end_of_group

                var pi = Math.PI,
                x = Math.sin(location * pi / 180) * ((rating -100) * -1),
                y = Math.cos(location * pi / 180) * ((rating -100) * -1);

                return {x: x, y: y};

            };

            //dont bind this one to the scope because its triggerable by broadcast event
            function getNewSubfactorData(name, type) {
                var change_to_subfactor = type,
                    movie_data;

                //check what genre is active
                if( $scope.active_subfactor === change_to_subfactor ) {
                    return;
                }

                switch(change_to_subfactor) {
                    case 'genre':
                        $scope.active_subfactor = change_to_subfactor;
                        movie_data = $scope.getGenreMovies();
                        break;
                    case 'length':
                        $scope.active_subfactor = change_to_subfactor;
                        movie_data = $scope.getLengthMovies();
                        break;

                    case 'release_date':
                        $scope.active_subfactor = change_to_subfactor;
                        movie_data = $scope.getReleaseDateMovies();
                        break;
                    
                    default:
                        movie_data = null;

                }


                if(movie_data !== null) {
                    return movie_data;
                } else {
                    return 'error no movie data';
                }

            };

   	    }]);
