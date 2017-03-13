(function() {
    'use strict';

    angular
        .module('app.dashboard')
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
      
      $stateProvider
        .state('app.dashboard', {
          url: '/dashboard',
          title: 'Dashboard',
          templateUrl: helper.basepath('dashboard/dashboard.html')
        })
      
    }

})();