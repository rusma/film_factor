'use strict';

/* Services */


var host = window.location.host == 'local:8000' ? '.ld' : '';

// EXAMPLE API CALL FOR FOOTBALL STATS
angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getGenreMovies = function() {
  		return $http.jsonp('http://tff.maikelvlasman.com'+host+':8011/_api/movies/genre/all/1000');
  	};

  	maiVCApiService.getLengthMovies = function() {
  		return $http.jsonp('http://tff.maikelvlasman.com'+host+':8011/_api/movies/runtime/all/1000');
  	};

  	return maiVCApiService;
  });

