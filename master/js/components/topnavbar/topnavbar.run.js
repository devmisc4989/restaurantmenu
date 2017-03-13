(function () {
    'use strict';

    angular
        .module('app.topnavbar')
        .run(topnavbar_run);

    topnavbar_run.$inject = [
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
     * @name topnavbar_run
     * @desc Run this module
     */
    function topnavbar_run($rootScope,
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

