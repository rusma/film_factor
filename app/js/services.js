'use strict';

/* Services */


var host = window.location.host == 'local:8000' ? '.ld' : '';

// EXAMPLE API CALL FOR FOOTBALL STATS
angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getMovies = function(factor) {
  		return $http.jsonp('http://tff.maikelvlasman.com'+host+':8011/_api/movies/'+factor+'/all/1000');
  	};
  	
  	return maiVCApiService;
  });