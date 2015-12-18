(function () {
    var mod = angular.module('common.directives.keybinding', []);

    mod.directive('bpEnterPress', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keydown keypress ', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.bpEnterPress);
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    });
}());