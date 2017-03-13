(function () {
    'use strict';

    angular
        .module('app.booking')
        .run(booking_run);

    booking_run.$inject = [
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
     * @name booking_run
     * @desc Run this module
     */
    function booking_run($rootScope,
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

