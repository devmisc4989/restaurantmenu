(function () {
  'use strict';

  angular
    .module('app.auth')
    .run(authRun);

  authRun.$inject = ['AUTH_CFG', '$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors', 'AuthService', '$localStorage', '$http', '$mdDialog'];

  function authRun(AUTH_CFG, $rootScope, $state, $stateParams, $window, $templateCache, Colors, AuthService, $localStorage, $http, $mdDialog) {



    // console.log("$localStorage.user: ", $localStorage.user)
    $rootScope.brandName = "menuCLOUD";
    // initializing session on angular app from localStorage
    // and fetch user profile data
    function clearSession() {
      $localStorage.$reset();
      $rootScope.user = void(0);
      $rootScope.initialzed = true;
      $http.defaults.headers.common["Authorization"] = void(0)
    }

    function logout() {
      AuthService.logout()
    }

    function initAuth() {
      console.log('initAuth');
      if ($localStorage.authorization && $localStorage.user) {
        $rootScope.user = $localStorage.user;
        $http.defaults.headers.common["Authorization"] = $localStorage.authorization;
        fetchUserProfile()
      } else {
        console.log('reset $localStorage');
        clearSession();
        // $rootScope.$emit("$logout")
      }
    }

    // INITIALIZE APP SESSION
    initAuth();
    $rootScope.$on('$updateUserProfile', function (event, user) {
      updateAuth(user)
    });

    function fetchUserProfile() {
      AuthService.me().then(
        function (user) {
          console.log('init user: ', user);
          updateAuth(user);
          $rootScope.initialzed = true
        }
        , function (err, status) {
          // console.log('status: ', status)
          clearSession()
        }
      )
    }

    function updateUserProfile(user) {
      $rootScope.user = $localStorage.user = user;

    }

    function updateAuth(user, token) {
      if (user) updateUserProfile(user);
      if (token) $localStorage.authorization = $http.defaults.headers.common["Authorization"] = token;
      if (!user && !token) {
        $rootScope.$emit('$logout')
      }
    }

    $rootScope.$on('$login', function (event, payload) {
      // console.log('on login')
      var user = payload[AUTH_CFG.auth_fields.user];
      var authorization = payload[AUTH_CFG.auth_fields.authorization];
      updateAuth(user, authorization);
      $rootScope.initialzed = true
    });

    /*$rootScope.$on("$stateChangeStart", function (event, toState) {
     // console.log('toState: ', toState)
     // console.log('arguments: ', arguments)
     if ((!toState.data || !toState.data.public) && !$localStorage.authorization) {
     $localStorage.$reset()
     event.preventDefault();
     $state.go("401");
     }
     });*/

    $rootScope.$on('$unauthorized', function (event) {
      console.log('$unauthorized');
      event.preventDefault();
      // $state.go("401");
      $rootScope.initialzed = true;
      // window.location.href = "/#/unauthorized"
    });
    $rootScope.$logout = function () {
      $rootScope.$emit('$logout')
    };
    $rootScope.$on('$logout', function (event) {
      $mdDialog.show({ 
          parent: angular.element(document.body), 
          targetEvent: event, 
          templateUrl: "/app/pages/partials/auth-logout.html", 
          clickOutsideToClose: true, 
          escapeToClose: true, 
          controllerAs: 'dialog', 
          controller: "AuthLogoutDialogCtrl"           
      }).then(dialog_success_fn); 
 
      /** 
       * @name dialog_success_fn 
       * @desc clearSession 
       */ 
      function dialog_success_fn(data, status, headers, config) { 
        clearSession(); 
        $state.go('page.login'); 
      } 
       
    });

  }

})();

