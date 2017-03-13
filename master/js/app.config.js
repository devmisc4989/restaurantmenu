(function() {
    'use strict';

    angular
        .module('menucloud')
        .config(AppConfig);

    AppConfig.$inject = [
        '$sailsProvider',
        'dialogsProvider',
        '$mdIconProvider',
        '$mdThemingProvider',
        '$locationProvider',
        '$urlMatcherFactoryProvider'
    ];

    function AppConfig(
        $sailsProvider,
        dialogsProvider,
        $mdIconProvider,
        $mdThemingProvider,
        $locationProvider,
        $urlMatcherFactoryProvider
    ){

        //////   Location Provider config
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
        //
        //$urlMatcherFactoryProvider.strictMode(false);

        /*
        ngSails
        */
        // console.log('apiBaseUrl prefix: ', apiBaseUrl, prefix)
        $sailsProvider.url = apiBaseUrl;
        $sailsProvider.urlPrefix = prefix;
        // console.log("$sailsProvider.url: ", $sailsProvider.url )
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useFontAwesome();
        // dialogsProvider.useEscClose(false);
        // dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');

        $mdIconProvider.defaultIconSet('/vendor/material-design-icons/iconfont/MaterialIcons-Regular.svg', 50);
        $mdIconProvider.fontSet('md', 'material-icons');
        $mdThemingProvider.theme('menucloud-std');

        // $mdIconProvider.theme('default')
        // $mdThemingProvider
        //     .primaryPalette('orange')
        //     .accentPalette('pink');
    }

})();