'use strict';
angular.module('LocalStorageModule').value('prefix', 'myPre');

// Declare app level module which depends on filters, and services
angular.module('film_factor', [
	'LocalStorageModule',
  	'film_factor.controllers',
  	'film_factor.services',
  	'film_factor.directives',
  	'film_factor.filters'
]);
