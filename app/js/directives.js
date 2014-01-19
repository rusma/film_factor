'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('scatterPlot', function() {
    return {
            restrict: 'A', // Directive Scope is Attribute
            link: function (scope, elem, attrs) {
                var _scope = scope
                var _elem = elem;

                scope.initChart().then(function(){
                    //start with the movies of genres
                    scope.getGenreMovies().then(function(data){
                        console.log(data);
                         // var data = _scope.generateRandomGenreMoviesData();
                        _scope.renderChart(data, _elem[0]);
                    });
                });
            },
       }
    });
