'use strict';

/* Services */


// EXAMPLE API CALL FOR FOOTBALL STATS
angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getGenreMovies = function() {
  		return $http.jsonp('http://tff.maikelvlasman.com:8011/_api/movies/genre/1000');
  	};

  	maiVCApiService.getLengthMovies = function() {
  		return $http.jsonp('http://tff.maikelvlasman.com:8011/_api/movies/runtime/1000');
  	};

  	return maiVCApiService;
  });

