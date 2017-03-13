(function () {
  'use strict';

  angular
    .module('app.profile')
    .service('ProfileService', ProfileService);

  ProfileService.$inject = ['$http', '$q', '$localStorage', '$httpParamSerializer', '$rootScope'];

  function ProfileService($http, $q, $localStorage, $httpParamSerializer, $rootScope) {
  }

})();