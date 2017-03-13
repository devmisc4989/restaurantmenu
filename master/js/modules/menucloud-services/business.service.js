(function() {
    'use strict';

    angular
        .module('menucloud.services')
        .service('BusinessService', BusinessService);

    BusinessService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
      /*,'MenuService'*/
    ];
    
    function BusinessService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails/*, MenuService*/) {

        
        var model_name = 'business';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        Serviceinstance.addUser = addUser;

        function addUser(id, body){
          var action = '/addUser/'+id;
          
          // arguments: (method, action, body)
          // @method: 'get' || 'put' || 'post' || 'delete'
          // @action: '/someaction'
          // @body: Object @optional
          
          return Serviceinstance.customAction('put', action, body)
        }
        
        /*********************************************************************************
        @GUIDE:
        */
        // custom method example (see ../components/factories/rest.factory for details)
        /*
        Serviceinstance.yourAction = yourAction

        function yourAction(id, body){
          var action = '/action/'+id
          
          // arguments: (method, action, body)
          // @method: 'get' || 'put' || 'post' || 'delete'
          // @action: '/someaction'
          // @body: Object @optional
          
          return Serviceinstance.customAction('put', action, body)
        }
        **********************************************************************************/
        
        return  Serviceinstance;
        
    }
})();