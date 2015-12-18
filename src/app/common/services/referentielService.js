/**
 * Created by at20903 on 15/09/15.
 */
(function () {
    var app = angular.module('Technician-Mobile-App.common.services.referentielService', []);

    app.factory('referentielService', function ($http, $log, $q, constants) {

        function getReferentiel(coetb) {
            try {
                return $q.when([1, 2, 3]);
            }
            catch (e) { $log.error(e); }
        }

        return {
            getReferentiel: getReferentiel
        };
    });

}());
