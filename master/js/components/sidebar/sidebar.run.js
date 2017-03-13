(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .run(sidebarRun);

    sidebarRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors', 'AuthService','$localStorage', '$http'];
    
    function sidebarRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, AuthService, $localStorage, $http) {
        $rootScope.sidebar = {
            quickLinks: [
                { sref: 'app.restaurant', text: 'First restaurant' },
                { sref: 'app.restaurant', text: 'Restaurant Two' }
            ]
        };
    }

})();

