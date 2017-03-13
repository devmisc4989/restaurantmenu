(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLockCtrl', AuthLockCtrl);


  AuthLockCtrl.$inject = ['$rootScope', '$scope', 'AuthService', '$state'];

  function AuthLockCtrl($rootScope, $scope, AuthService, $state) {
    var vm = this;

    activate();

    function activate() {
      // bind here all data from the form
      vm.account = {};
      // place the message if something goes wrong
      vm.errMsg = '';
      // set form data
      setFormData();
      if ($rootScope.user) {
        $rootScope.auth.form.title.name = $rootScope.user.first_name + ' ' + $rootScope.user.last_name;
      }

      function modifyBody(data) {
        var body = {
          email: $rootScope.user.email,
          password: data.password
        };
        return body
      }

      vm.login = function () {
        vm.errMsg = '';
        vm.okMsg = '';

        if (vm.loginForm.$valid) {
          // console.log('vm.account: ', vm.account)
          vm.loading = true;
          var body = modifyBody(vm.account);
          console.log('account: ', body);
          AuthService.login(body).then(
            function (payload) {
              vm.loading = false;
              $rootScope.$emit('$login', payload);
              $state.go('app.dashboard');
            }
            , function (err) {
              vm.loading = false;
              console.log('result: ', arguments);
              if (err) {

                if (err.message) {
                  vm.errMsg = err.message
                } else {
                  if (_.isString(err)) {
                    vm.errMsg = err
                  } else {
                    vm.errMsg = "Unable to Login"
                  }
                }
              } else {
                vm.errMsg = "Server Request Error"
              }
            }
            , function (status) {
              vm.loading = false;
              console.log('status: ', status);
              vm.unverified = body.email
            }
          )
        }
        else {
          // set as dirty if the user click directly to login so we show the validation messages
          /*jshint -W106*/
          vm.loginForm.account_password.$dirty = true;
        }
      };

      function setFormData() {
        $rootScope.auth = {
          form: {
            title: {
              name: '',
              description: '',
              hasIcon: true,
              icon: 'icon-lock-screen'
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
