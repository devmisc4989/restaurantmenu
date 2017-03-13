(function () {
  'use strict';

  angular
    .module('app.restaurant')
    .run(restaurantRun);

  restaurantRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors', 'AuthService', '$localStorage', '$http'];

  function restaurantRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, AuthService, $localStorage, $http) {

  }

})();

