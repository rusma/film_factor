'use strict';

/* Services */


var host = window.location.host == 'local:8000' ? '.ld' : '';

angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getMoviesData = function(subfactor) {
      console.log('http://tff.maikelvlasman.com'+host+':8011/_api/movies/'+ subfactor +'/all/1000?_jsonp_callback=received_data');
  		return $http.jsonp('http://tff.maikelvlasman.com'+host+':8011/_api/movies/'+ subfactor +'/all/1000?_jsonp_callback=received_data');
  	};

  	return maiVCApiService;
  });