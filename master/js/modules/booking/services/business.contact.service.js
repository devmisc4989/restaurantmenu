(function() {
    'use strict';

    angular
        .module('app.booking.services')
        .service('BusinessContactService', BusinessContactService);

    BusinessContactService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
      /*,'MenuService'*/
    ];
    
    function BusinessContactService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails/*, MenuService*/) {
        
        var model_name = 'customer';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        return  Serviceinstance;
        
    }
})();