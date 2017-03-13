(function() {
    'use strict';

    angular
        .module('menucloud.custom')
        .config(Config);
        
    Config.$inject = [
      /*'$controllerProvider'
      ,'$compileProvider'
      ,'$filterProvider'
      ,'$provide'
      ,'$animateProvider'
      ,'$locationProvider'
      ,'$urlRouterProvider'
      ,*/
    ];

    function Config(
      /*$controllerProvider
      ,$compileProvider
      ,$filterProvider
      ,$provide
      ,$animateProvider
      ,$locationProvider
      ,$urlRouterProvider
      ,*/
    ){
      
      /*
      var menu = angular.module('menu');
      // registering components after bootstrap
      menu.controller = $controllerProvider.register;
      menu.directive  = $compileProvider.directive;
      menu.filter     = $filterProvider.register;
      menu.factory    = $provide.factory;
      // menu.service    = $provide.service;
      menu.constant   = $provide.constant;
      menu.value      = $provide.value;
      
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);
      */

    }

})();