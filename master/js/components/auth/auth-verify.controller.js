/**=========================================================
 * Component: access-register.js
 * Demo for register account api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthVerifyCtrl', AuthVerifyCtrl);

  AuthVerifyCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AuthService', 'InviteService'];
  function AuthVerifyCtrl($rootScope, $scope, $state, $stateParams, AuthService, InviteService) {
    var vm = this;
    console.log('stateParams: ', $stateParams);
    activate();

    ////////////////
    function modifyBody(data) {
      var body = {
        verification: $stateParams.verification,
        password: data.password
      };
      return body
    }

    function activate() {
      // bind here all data from the form
      vm.account = {};
      // place the message if something goes wrong
      vm.errMsg = '';
      vm.invalidMsg = '';
      // set form data
      setFormData();
      if ($stateParams.verification) {
        vm.invalidMsg = '';
      } else {
        vm.invalidMsg = "Invalid or broken link"
      }
      function verify(body) {
        AuthService.verify(body).then(
          function (payload) {
            if (payload.user && payload.authorization) {
              $rootScope.$emit('$login', payload);
              $state.go('app.dashboard');
            } else {
              $state.go('page.login');
            }

          }, function (err) {
            console.log('Error: ', err);
            if (err) {
              if (err.message) {
                vm.errMsg = err.message
              } else {
                if (_.isString(err)) {
                  vm.errMsg = err
                } else {
                  vm.errMsg = "Unable to Verify Your Account"
                }
              }
            } else {
              vm.errMsg = "Server Request Error"
            }
          }
        )
      }

      vm.verify = function () {
        vm.errMsg = '';

        if (vm.passwordForm.$valid) {
          if ($stateParams.verification) {
            var body = modifyBody(vm.account);
            console.log('body: ', body);
            verify(body)
          } else {
            console.log('something goes wrong')
          }

        } else {
          vm.passwordForm.account_password.$dirty = true;
          vm.passwordForm.account_password_confirm.$dirty = true;
          vm.passwordForm.agree.$dirty = true;
        }
      };

      function setFormData() {
        $rootScope.auth = {
          form: {
            title: {
              name: 'CHOOSE YOUR PASSWORD',
              description: '',
              hasIcon: false,
              icon: ''
            }
          },
          popup: {
            showPopup: false,
            title: '',
            receiverEmail: null,
            okUri: 'page.login',
            okText: ''
          }
        };
      }
    }
  }

})();