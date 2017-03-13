(function() {
    'use strict';

    angular
        .module('menucloud.custom')
        .config(Config);
        
    Config.$inject = [
      '$stateProvider'
      ,'RouteHelpersProvider'
      ,'$urlRouterProvider'
    ];

    function Config(
      $stateProvider
      ,helper
      ,$urlRouterProvider
    ){
      // @NOTE: this is guide template router. views does not exists
      /*
      $stateProvider
        .state('app.custom', {
          url: '/custom',
          title: "Custom List",
          templateUrl: helper.basepath('custom/custom.list.html')
        })
        .state('app.custom-element',{
          url: '/custom/:menu_id',
          title: "Custom Element"

          controller: "CustomElementCtrl",
          controllerAs: "vm",
          templateUrl: helper.basepath('custom/custom.element.html')
        })
      */
    }

})();