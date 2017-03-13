/**=========================================================
 * Component: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
  'use strict';

  angular
    .module('app.routes')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    // defaults to dashboard
    $urlRouterProvider
      .when('', '/app/dashboard')
      .when('/', '/app/dashboard')
      .when('/#/', '/app/dashboard')
      .otherwise('/page/login');

    //
    // Application Routes
    // -----------------------------------
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        resolve: helper.resolveFor('modernizr', 'icons', 'screenfull', 'ui-select', 'toaster', 'whirl', 'material-design-icons')
      })

      //
      // Single Page Routes
      // -----------------------------------
      .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ['$rootScope', function ($rootScope) {
          $rootScope.app.layout.isBoxed = false;
        }]
      })

      .state('page.login', {
        url: '/login',
        title: 'Login',
        templateUrl: 'app/pages/signin.html',
        access: {
          public: true
        }
      })
      .state('page.register', {
        url: '/register',
        title: 'Register',
        templateUrl: 'app/pages/signup.html',
        access: {
          public: true
        }
      })
      .state('page.forgot-password', {
        url: '/forgot-password',
        title: 'Forgot Password',
        templateUrl: 'app/pages/forgot-password.html',
        access: {
          public: true
        }
      })
      .state('page.reset', {
        url: '/reset?token&i',
        title: 'Reset Your Password',
        templateUrl: 'app/pages/reset-password.html',
        access: {
          public: true
        }
      })

      .state('page.verify', {
        url: '/verify?verification',
        title: 'Your email address has been verified',
        templateUrl: 'app/pages/verify.html',
        access: {
          public: true
        }
      })

      .state('page.lock', {
        url: '/lock',
        title: 'Lock',
        templateUrl: 'app/pages/lock.html',
        access: {
          public: true
        }
      })
      .state('page.404', {
        url: '/404',
        title: 'Not Found',
        templateUrl: 'app/pages/404.html',
        access: {
          public: true
        }
      })


    //
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // -----------------------------------
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;

  } // routesConfig

})();

