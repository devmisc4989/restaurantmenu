(function() {
    'use strict';

    angular
        .module('app.subtopnavbar')
        .run(subtopnavbarRun);

    subtopnavbarRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors', 'AuthService','$localStorage', '$http'];
    
    function subtopnavbarRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, AuthService, $localStorage, $http) {
        $rootScope.subtopnavbar = {
            tabId: 0
        };
    }

})();

