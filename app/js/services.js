'use strict';

/* Services */


// EXAMPLE API CALL FOR FOOTBALL STATS
angular.module('film_factor.services', []).
  factory('statsfcApiService', function($http) {
  	var statsfcApi = {};
      
  	statsfcApi.getTopScorers = function() {
  		return $http({
  			method: 'GET',
  			url: 'https://willjw-statsfc-competitions.p.mashape.com/results.json?key=free&competition=premier-league&team=liverpool&year=2013%2F2014&from=2013-01-01&to=2013-12-31&timezone=Europe%2FLondon&limit=10',
  			headers: {"X-Mashape-Authorization": "kFv3KUMDpoxt98Rh6u9ytW5IEpEWdKqQ"}
  		});
  	};
      
  	return statsfcApi;
  });

