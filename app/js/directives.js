'use strict';

/* Directives */


angular.module('film_factor.directives', []).
  directive('scatterPlot', function() {
    return {
            restrict: 'A', // directive Scope is Attribute
            link: function (scope, elem, attrs) {
                //cache these, so we can access them later on in a different scope
                var _scope = scope
                var _elem = elem;

                scope.initChart().then(function(){
                    //start with the genremovies
                    scope.getMovies('genre').then(function(data){
                        console.log(data);
                        _scope.renderChart(data, _elem[0]);
                    });
                });
            },
       }
    });
