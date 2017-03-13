(function() {
    'use strict';

    angular
        .module('menucloud.services')
        .service('InviteService', InviteService);

    InviteService.$inject = [
      '$http'
      ,'$q'
      ,'$localStorage'
      ,'$httpParamSerializer'
      ,'$rootScope'
      ,'RestFactory'
      ,'$sails'
      /*,'MenuService'*/
    ];
    
    function InviteService($http, $q, $localStorage, $httpParamSerializer, $rootScope, RestFactory, $sails/*, MenuService*/) {

        var model_name = 'invite';
        var Service = function(){
          RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);
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
        */
        Serviceinstance.resend = resend;
        Serviceinstance.accept = accept;
        
        function accept(id, body){
          var action = '/accept/'+id;
          return Serviceinstance.customAction('put', action, body)
        }

        function resend(id){
          var action = '/resend/'+id;
          return Serviceinstance.customAction('get', action)
        }
        return  Serviceinstance;
    }
})();