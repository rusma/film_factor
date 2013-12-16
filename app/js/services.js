'use strict';

/* Services */


// EXAMPLE API CALL FOR FOOTBALL STATS
angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getGenreMovies = function() {
  		return $http({
  			method: 'GET',
        url: 'https://dl.dropboxusercontent.com/s/jjnme1btfyfz6jq/movies-with-genre-ids.json?dl=1&token_hash=AAEYgUhVTBQuFk7d3u1LJ99Yugc8kdP4GIF5Z6zM2L6J5w',
  		});
  	};

  	return maiVCApiService;
  });

