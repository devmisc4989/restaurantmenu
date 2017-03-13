/**=========================================================
 * Component: access-register.js
 * Demo for register account api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginCtrl', AuthLoginCtrl);


  AuthLoginCtrl.$inject = ['$rootScope', '$scope', 'AuthService', '$state'];

  function AuthLoginCtrl($rootScope, $scope, AuthService, $state) {
    var vm = this;
    // check if user already logged in
    // console.log('AuthService.isAuthenticated: ', AuthService.isAuthenticated())
    if (AuthService.isAuthenticated()) {
      AuthService.me().then(
        function (user) {
          authorize()
        },
        function (err) {
          var msg = 'Session expired';
          var errMsg = msg;
          if (err) {
            if (_.isString(err)) {
              errMsg = err
            } else {
              errMsg = err.message || err.msg || errMsg
            }
          }
        }
      )
    } else {
      // not authorized
    }
    activate();
    ////////////////
    function authorize() {
      $state.go('app.dashboard')
    }

    function activate() {
      // bind here all data from the form
      vm.account = {};
      // place the message if something goes wrong
      vm.errMsg = '';

      // set form data
      setFormData();

      function modifyBody(data) {
        var body = {
          email: data.email,
          password: data.password
        };
        return body
      }

      vm.getVerified = function () {
        vm.errMsg = '';
        vm.okMsg = '';
        if (vm.account.email) {
          AuthService.getVerified(vm.account.email)
            .then(
              function (data) {
                vm.unverified = null;
                vm.okMsg = data
              }, function (err) {
                vm.errMsg = err
              }
            )
        }
      }

      vm.login = function () {
        vm.errMsg = '';
        vm.okMsg = '';
        vm.unverified = null;

          if(vm.loginForm.$valid) {
            // console.log('vm.account: ', vm.account)
            vm.loading = true;
            var body = modifyBody(vm.account);
            AuthService.login(body).then(
              function (payload){
                vm.loading = false;
                var user = payload.user;
                if(user && user.role == "user"){
                  $rootScope.$emit('$login', payload);
                  $state.go('app.dashboard');
                  // $state.go('page.login')
                }else{
                  vm.errMsg = "You are not allowed to access menucloud dashboard"
                }
              }
              ,function (err){
                vm.loading = false;
                console.log('result: ', arguments);
                if(err){
                  
                  if(err.message){
                    vm.errMsg = err.message
                  }else{
                    if(_.isString(err)){
                      vm.errMsg = err
                    }else{
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
          vm.loginForm.email.$dirty = true;
          vm.loginForm.password.$dirty = true;
        }
      };

      function setFormData() {
        $rootScope.auth = {
          form: {
            title: {
              name: '',
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
