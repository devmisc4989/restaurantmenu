(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .run(dashboardRun);

  dashboardRun.$inject = ['$rootScope'];

  function dashboardRun($rootScope) {
    $rootScope.topnavbar = {
      title: 'MENU OVERVIEW'
    };
  }

})();

