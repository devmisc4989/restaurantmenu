(function() {
    'use strict';

    angular
        .module('app.booking.services')
        .service('BusinessFeedbackService', BusinessFeedbackService);

    BusinessFeedbackService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
    ];
    
    function BusinessFeedbackService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails) {
        
        var model_name = 'feedback';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        return  Serviceinstance;
        
    }
})();