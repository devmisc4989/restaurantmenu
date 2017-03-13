(function () {
    'use strict';

    angular
        .module('app.notification')
        .run(notification_run);

    notification_run.$inject = [
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
     * @name notification_run
     * @desc Run this module
     */
    function notification_run($rootScope,
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

