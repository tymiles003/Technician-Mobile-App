(function () {
    var mod = angular.module('Technician-Mobile-App.login.controller',
        ['Technician-Mobile-App.common.services.constants']);

    mod.controller('LoginController', function ($scope, $location, $log, $modal, $q) {

        function initScope() {

        }

        $q.all($scope.bootPromiseHash).then(function (resultHash) {
            $log.log("bootPromiseHash.then");

            initScope();

        }, function (reason) {
            $log.error("reason");
        });


    });

    mod.config(function config($stateProvider, constants) {

        $stateProvider.state('login', {
            url: constants.navigationUrl.login,
            views: {
                "main": {
                    controller: 'LoginController',
                    templateUrl: 'login/login.tpl.html'
                }
            }
        });
    });

}());
