(function () {
  'use strict';

  angular
    .module('app.profile')
    .run(profileRun);

  profileRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors', 'AuthService', '$localStorage', '$http'];

  function profileRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, AuthService, $localStorage, $http) {

  }

})();

