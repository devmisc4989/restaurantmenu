(function() {
    'use strict';

    angular
        .module('app.booking.services')
        .service('BookingTypeService', BookingTypeService);

    BookingTypeService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
      /*,'MenuService'*/
    ];
    
    function BookingTypeService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails/*, MenuService*/) {

        
        var model_name = 'bookingType';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        return  Serviceinstance;
        
    }
})();