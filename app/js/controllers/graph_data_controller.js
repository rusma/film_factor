'use strict';

/* GRAPH DATA CONTROLLER */

/**** THIS CONTROLLER GETS THE DATA FOR ALL KIND OF FILTERS AND SUBFACTORS****/

angular.module('film_factor.controllers').
    controller('graph_data_controller', ['$scope', 'maiVCApiService', 'localStorageService',
        function($scope, maiVCApiService, localStorageService) {
            //set active subfactor to genre which is what the user starts with
            $scope.active_subfactor = 'genre';
            //event for click on a subfactor input
            $scope.$on('clickedRadioSubfactor', getNewSubfactorData);
			
            //function to show loader and black overlay while loading data
            $scope.loader = function(remove) {
                var $overlay = $('.overlay'),
                    $loader = $('#loader');

                if(remove === true) {
                    $overlay.hide();
                    $loader.hide();
                } else {
                    $overlay.show();
                    $loader.show();
                }
            };

            $scope.getMovies = function(subfactor) {
                var dfrd = $.Deferred();

                //check if the data is cached for the subfactor
                if( typeof( localStorageService.get(subfactor) ) === 'undefined' ||
                    localStorageService.get(subfactor) == null) {

                    $scope.loader(false);
                    //couple a callback to the window .. -
                    window.received_data = function(response) {
                        if(response.length != 0 || response.error != null) {
                            localStorageService.add(subfactor, response);
                            $scope.loader(true);
                            dfrd.resolve(response);
                        }
                    };

                    // which this function will use as callback
                    maiVCApiService.getMoviesData(subfactor);

                } else {
                    //resolve with cached json
                    dfrd.resolve(localStorageService.get(subfactor));
                }

                return dfrd.promise();

            };


            //dont bind this one to the scope because its triggerable by broadcast event
            function getNewSubfactorData(name, type, callback) {
            	
                var change_to_subfactor = type,
                    movie_data;
					
                //check what genre is active
                if( $scope.active_subfactor === change_to_subfactor ) {
                    return;
                }

                //set the active subfactor
                $scope.active_subfactor = change_to_subfactor;

                $scope.getMovies(change_to_subfactor).then(function(data){
                    if(typeof(data) === 'undefined') {
                        console.log('no data returned from api');
                        return;
                    }
                    //trigger callback with the data
                    callback(data);
                });
            };

   	    }]);
