(function () {
    'use strict';

    angular
        .module('app.menu')
        .run(menu_run);

    menu_run.$inject = [
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
     * @name menu_run
     * @desc Run this module
     */
    function menu_run($rootScope,
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

