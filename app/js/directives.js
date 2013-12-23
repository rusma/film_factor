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
                    scope.getGenreMovies().then(function(data){
                        _scope.renderChart(_elem[0], data);
                        //listen for other events from now on
                        //_scope.listenForEvents()
                    });
                });
            },
       }
    });
