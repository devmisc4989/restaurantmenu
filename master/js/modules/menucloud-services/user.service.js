(function() {
  'use strict';

  angular
    .module('menucloud.services')
    .service('UserService', UserService);

  UserService.$inject = [
    '$http'
    ,'$q'
    ,'$localStorage'
    ,'$httpParamSerializer'
    ,'$rootScope'
    ,'RestFactory'
    ,'$sails'
    /*,'UserService'*/
  ];
  
  function UserService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails) {

      
    var model_name = 'user';
    var Service = function(){
      RestFactory.apply(this,arguments)
    };
    var Serviceinstance = new Service(model_name);
    
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