'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('footballTopscorers.services', []).
  factory('statsfcApiService', function($http) {
  	var statsfcApi = {};

  	statsfcApi.getTopScorers = function() {
  		return $http({
  			method: 'GET',
  			url: 'https://willjw-statsfc-competitions.p.mashape.com/top-scorers.json?key=free&competition=premier-league&team=liverpool&year=2013%2F2014',
  			headers: {"X-Mashape-Authorization": "kFv3KUMDpoxt98Rh6u9ytW5IEpEWdKqQ"}
  		});
  	};

  	return statsfcApi;
  });
