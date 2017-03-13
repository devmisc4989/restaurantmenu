/**=========================================================
 * Component: constants.js
 * Define constants to inject across the application
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.auth')
        .constant('AUTH_CFG', {
          'endpoint': apiEndPoint+'/auth',
          'auth_fields': {
            'user': 'user',
            'authorization': 'authorization'
          }
        })
})();

