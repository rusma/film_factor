'use strict';

/* Services */


var host = window.location.host == 'http://tff.maikelvlasman.com.ld:8011' ? '' : 'http://tff.maikelvlasman.com:8011';

angular.module('film_factor.services', []).
  factory('maiVCApiService', function($http) {
  	var maiVCApiService = {};

  	maiVCApiService.getMoviesData = function(subfactor) {
      console.log(host+'/_api/movies/'+ subfactor +'/all/1000?_jsonp_callback=received_data');
  		return $http.jsonp(host+'/_api/movies/'+ subfactor +'/all/1000?_jsonp_callback=received_data');
  	};

  	return maiVCApiService;
  });