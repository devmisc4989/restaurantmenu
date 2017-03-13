(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$httpProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($httpProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);
      /*
      Advanced pending request indicator
      @REASON: 
        $rootScope.processing is used to disable forms/buttons on active request
        to prevent double requests
      */
      $httpProvider.interceptors.push(function($q, $rootScope) {
        var numberOfHttpRequests = 0;
        return {
            request: function (config) {
              numberOfHttpRequests += 1;
              $rootScope.processing = true;
              return config;
            },
            requestError: function (error) {
              numberOfHttpRequests -= 1;
              $rootScope.processing = (numberOfHttpRequests !== 0);
              return $q.reject(error);
            },
            response: function (response) {
              numberOfHttpRequests -= 1;
              $rootScope.processing = (numberOfHttpRequests !== 0);
              return response;
            },
            responseError: function (error) {
              numberOfHttpRequests -= 1;
              $rootScope.processing = (numberOfHttpRequests !== 0);
              return $q.reject(error);
            }
        };
      });
      /*
      Basic pending request indicator
      @REASON: 
        $rootScope.processing is used to disable forms/buttons on active request
        to prevent double requests
      */
      
      /*
      $http.defaults.transformRequest.push(function (data) {
        console.log('data')
        $rootScope.processing = true;
        return data;
      });
      $http.defaults.transformResponse.push(function(data){
        console.log('data')
        $rootScope.processing = false;
        return data;
      }) 
      */
    }

})();