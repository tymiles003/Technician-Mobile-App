/**
 * Created by sebastien on 02/11/15.
 */
(function () {
    var mod = angular.module('Technician-Mobile-App.controller', [
    ]);

    mod.controller('AppCtrl', function ($rootScope, $scope, $location, $modal, $urlRouter, $log, $timeout, $q, $window, $http, constants, globalContext) {

        angular.element(window.document).ready(function () {
            $log.log('AppCtrl.angular.document.ready : start application');
        });

        /*****************
         * Initialization
         ******************/
        function initScope() {
            $log.log("AppCtrl.initScope");

            // you can access the globalContext on any page
            $rootScope.context = globalContext;

            /*var finalPromise = getContoursIris()
            .then( function( iris )
            {
                $rootScope.context.iris = iris.data;

                return getClients();

            })
            .then( function( clients )
            {
                $rootScope.context.clients = clients.data;
                return getPopulationIris();

            })
            .then( function( populationIris )
            {
                $rootScope.context.population = populationIris.data;
                return getTransports();
            })
            .then( function( transports )
            {
                $rootScope.context.transports = transports.data;
                return getCommerces();
            }).then( function( commerces )
            {
                $rootScope.context.commerces = commerces.data;
                return getFlux();
            }).then( function( flux )
            {
                $rootScope.context.flux = flux.data;
            });*/

            var finalPromise = true;

            $scope.bootPromiseHash = [];
            $scope.bootPromiseHash.appInitPromise = finalPromise;


        }


        /*****************
         * scope EVENTS, WATCHES
         ******************/
        initScope();

        $q.all($scope.bootPromiseHash).then(function(resultHash){
            console.log('appController bootPromiseHash.then');



        }, function(error){
            console.log(error);
        });

    });



}());