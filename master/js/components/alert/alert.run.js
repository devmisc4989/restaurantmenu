(function () {
    'use strict';

    angular
        .module('app.alert')
        .run(alert_run);

    alert_run.$inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$window',
        '$templateCache',
        'Colors',
        'AuthService',
        '$localStorage',
        '$http'];

    /**
     * @name alert_run
     * @desc Run this module
     */
    function alert_run($rootScope,
                      $state,
                      $stateParams,
                      $window,
                      $templateCache,
                      Colors,
                      AuthService,
                      $localStorage,
                      $http) {
    }

})();

