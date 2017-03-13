/**=========================================================
 * Component: access-register.js
 * Demo for register account api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthResetCtrl', AuthResetCtrl);

  AuthResetCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AuthService', 'InviteService'];
  function AuthResetCtrl($rootScope, $scope, $state, $stateParams, AuthService, InviteService) {
    var vm = this;
    console.log('stateParams: ', $stateParams);
    activate();

    ////////////////
    function modifyBody(data) {
      return data
    }

    function activate() {
      // bind here all data from the form
      vm.account = {};
      // place the message if something goes wrong
      vm.errMsg = '';
      vm.invalidMsg = '';

      // set form data
      setFormData();

      if ($stateParams.token) {
        AuthService.findByPassResetToken($stateParams.token)
          .then(
            function (data) {
              vm.password_owner = data;
              return data;
            },
            function (err) {
              vm.invalidMsg = err
            }
          );
      } else if ($stateParams.i) {
        InviteService.get($stateParams.i).then(
          function (res) {
            // vm.invite = res.data
            vm.password_owner = _.pick(res.data, 'first_name', 'last_name', 'email');
            console.log('invite data: ', vm.password_owner)
          },
          function (err) {
            vm.invalidMsg = _.isString(err) ? err : "Invite not found or not available anymore"
          }
        )
      } else {
        vm.invalidMsg = "Invalid or broken link"
      }
      function setPassword(body) {
        vm.errMsg = "";
        AuthService.setPassword($stateParams.token, body).then(
          function (payload) {
            $state.go('page.login');
          }, function (err) {
            if (err) {
              if (err.message) {
                vm.errMsg = err.message
              } else {
                if (_.isString(err)) {
                  vm.errMsg = err
                } else {
                  vm.errMsg = "Unable to Register New Accout"
                }
              }
            } else {
              vm.errMsg = "Server Request Error"
            }
          }
        )
      }

      function acceptInvite(body) {
        vm.errMsg = "";
        InviteService.accept($stateParams.i, body).then(
          function (res) {
            $rootScope.$emit('$login', res.data);
            $state.go('app.dashboard');
            // $state.go('page.login')
          },
          function (res) {
            var err = res.data;
            console.log('error: ', err);
            vm.errMsg = _.isString(err) ? err : (err.message || "Unable to accept invitation")
          }
        )
      }

      vm.setPassword = function () {
        vm.errMsg = '';

        if (vm.passwordForm.$valid) {
          var body = modifyBody(vm.account);

          if ($stateParams.token) {
            setPassword(body)
          } else if ($stateParams.i) {
            acceptInvite(body)
          } else {
            console.log('something goes wrong')
          }

        } else {
          // set as dirty if the user click directly to login so we show the validation messages
          /*jshint -W106*/
          // vm.passwordForm.account_email.$dirty = true;
          vm.passwordForm.account_password.$dirty = true;
          vm.passwordForm.account_password_confirm.$dirty = true;
          // vm.passwordForm.agree.$dirty = true;
          // vm.passwordForm.account_terms_accepted.$dirty = true;
          // vm.passwordForm.account_first_name.$dirty = true;
          // vm.passwordForm.account_last_name.$dirty = true;

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
            title: 'RESET YOUR PASSWORD',
            receiverEmail: vm.email,
            okUri: 'page.login',
            okText: 'SIGN IN'
          }
        };
      }
    }
  }

})();
