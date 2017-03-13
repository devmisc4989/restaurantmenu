(function() {
    'use strict';

    angular
        .module('app.booking.services')
        .service('BusinessCommentService', BusinessCommentService);

    BusinessCommentService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
    ];
    
    function BusinessCommentService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails) {
        
        var model_name = 'comment';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        return  Serviceinstance;
        
    }
})();