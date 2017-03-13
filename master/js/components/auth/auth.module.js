(function() {
    'use strict';

    angular
        .module('app.auth', [
          'ngAutodisable',
          'ngRoute',
          'ngAnimate',
          'ngStorage',
          'ngCookies',
          'pascalprecht.translate',
          'ui.bootstrap',
          'ui.router',
          'oc.lazyLoad',
          'cfp.loadingBar',
          'ngSanitize',
          'ngResource',
          'ui.utils',
          'ngAutocomplete'
        ]);
})();