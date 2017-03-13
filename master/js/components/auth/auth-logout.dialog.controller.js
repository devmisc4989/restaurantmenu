/**=========================================================
 * Component: auth-logout.dialog.controller.js
 *
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLogoutDialogCtrl', AuthLogoutDialogCtrl);

  AuthLogoutDialogCtrl.$inject = [
    '$rootScope'
    , '$localStorage'
    , '$scope'
    , '$state'
    , '$mdDialog'

  ];

  function AuthLogoutDialogCtrl(
    $rootScope
    , $localStorage
    , $scope
    , $state
    , $mdDialog

  ) {
    var dialog = this;

    /*********************************/
    ///////////////////////////////////////
    function activate(){
      $scope.user = $localStorage.user;      
      dialog.cancel = function() {
        $mdDialog.cancel();
      };
      dialog.logout = function() {
        $mdDialog.hide();
      };
    }

    activate()
  }

})();
