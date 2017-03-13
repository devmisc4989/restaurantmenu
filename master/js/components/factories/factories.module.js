(function() {
    'use strict';

    angular
        .module('app.factories', [
            'ngSails',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource'
        ]);
})();