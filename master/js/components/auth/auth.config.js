(function() {
    'use strict';

    angular
        .module('app.auth')
        .config(authConfig);

    authConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function authConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var auth = angular.module('app.auth');
      // registering components after bootstrap
      auth.controller = $controllerProvider.register;
      auth.directive  = $compileProvider.directive;
      auth.filter     = $filterProvider.register;
      auth.factory    = $provide.factory;
      auth.service    = $provide.service;
      auth.constant   = $provide.constant;
      auth.value      = $provide.value;
      // Disables animation on items with class .ng-no-animation
      
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();