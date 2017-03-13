/**=========================================================
 * Component: access-register.js
 * Demo for register account api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthRecoverCtrl', AuthRecoverCtrl);


  AuthRecoverCtrl.$inject = ['$rootScope', '$scope', 'AuthService', '$state'];

  function AuthRecoverCtrl($rootScope, $scope, AuthService, $state) {

    var vm = this;
    activate();

    ////////////////

    function activate() {
      // bind here all data from the form
      vm.email = '';
      // place the message if something goes wrong
      vm.errMsg = '';
      vm.okMsg = '';

      // set form data
      setFormData();

      function modifyBody(data) {
        var body = {
          email: data
        };
        return body
      }

      vm.resetPassword = function () {
        console.log('resetPassword: for ', vm.email);
        vm.errMsg = '';
        vm.okMsg = '';
        $rootScope.auth.popup.showPopup = false;

        if (vm.recoverForm.$valid) {
          // console.log('vm.account: ', vm.account)
          var body = modifyBody(vm.email);

          AuthService.resetPassword(body).then(
            function (data) {
              //vm.email = ''
              vm.recoverForm.email.$dirty = false;
              //vm.okMsg = data
              $rootScope.auth.popup.showPopup = true;
              $rootScope.auth.popup.receiverEmail = vm.email
            }
            , function (err) {
              if (err) {
                if (err.message) {
                  vm.errMsg = err.message
                } else {
                  if (_.isString(err)) {
                    vm.errMsg = err
                  } else {
                    vm.errMsg = "Unable to Reset Your Password "
                  }
                }
              } else {
                vm.errMsg = "Server Request Error"
              }
            }
          )
        }
        else {
          // set as dirty if the user click directly to login so we show the validation messages
          /*jshint -W106*/
          vm.recoverForm.email.$dirty = true;
        }
      }

      function setFormData() {
        $rootScope.auth = {
          form: {
            title: {
              name: 'FORGOT YOUR PASSWORD?',
              description: 'Enter your current email and we will send you a reset link',
              hasIcon: false,
              icon: ''
            }
          },
          popup: {
            showPopup: false,
            title: 'RESET YOUR PASSWORD',
            receiverEmail: '',
            okUri: 'page.login',
            okText: 'SIGN IN',
            resendLink: function () {
              vm.resetPassword()
            }
          }
        };
      }
    }
  }
})();
