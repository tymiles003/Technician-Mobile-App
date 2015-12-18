(function () {
    //https://github.com/fredricrylander/angular-webstorage

    var mod = angular.module('Technician-Mobile-App.common.services.globalContext', []);

    //Global service for global variables
    mod.factory("globalContext", [ '$http' , function($http){

    	return "test";

    }]);

}());

