(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http', '$q', '$localStorage', '$httpParamSerializer', '$rootScope'];

  function DashboardService($http, $q, $localStorage, $httpParamSerializer, $rootScope) {
  }

})();