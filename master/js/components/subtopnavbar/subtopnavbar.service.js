(function() {
    'use strict';

    angular
        .module('app.subtopnavbar')
        .service('SubtopnavbarService', SubtopnavbarService);

    SubtopnavbarService.$inject = ['$http', '$q', '$localStorage', '$httpParamSerializer', '$rootScope'];
    
    function SubtopnavbarService($http, $q, $localStorage, $httpParamSerializer, $rootScope) {
    }
    
})();