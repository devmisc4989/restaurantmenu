/*!
 *
 * Angle - Bootstrap Admin App + AngularJS
 *
 * Angle Theme Seed: 0.1
 * 
 * 
 *
 */

// APP START
// -----------------------------------

'use strict';
var apiBaseUrl = '';
var prefix = "/api/v1";
// gulp:overrideApiBaseUrl 
apiBaseUrl = 'http://localhost:1447';
// gulp:endOverrideApiBaseUrl
var apiEndPoint = apiBaseUrl + prefix;
io.sails.url = apiBaseUrl;
(function () {
    angular
        .module('menucloud', [
            // global bower modules
            'ngSails',
            'ngAutodisable',
            'dialogs.main',
            'ui.bootstrap',
            'ui.select',
            'angular-momentjs',
            'ngMaterial',
            'ADM-dateTimePicker',
            'ui.materialize.collapsible',
            //'dndLists',
            // ,'toaster'
            // ,'ui.ace'
            /*
             // has to get values from this provider and set it manually at app.translate
             ,'dialogs.default-translations'
             */
            // app components
            'app.alert',
            'app.notification',
            'app.topnavbar',
            'app.core',
            'app.auth',
            'app.routes',
            'app.factories',
            'app.loadingbar',
            'app.navsearch',
            'app.preloader',
            'app.translate',
            'app.pages',
            'app.directives',
            'app.panels',
            'app.material',
            'app.settings',
            'app.sidebar',
            'app.utils',
            'app.material',
            'app.toaster',
            'app.elements',
            'app.dashboard',
            'app.restaurant',
            'app.menu',
            'app.booking',
            'app.subtopnavbar',
            'app.profile',
            // custom modules
            'menucloud.services'
            // other
        ]);
})();

