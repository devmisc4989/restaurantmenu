(function () {
    'use strict';

    angular
        .module('app.menu')
        .config(Config);

    Config.$inject = [
        '$stateProvider',
        'RouteHelpersProvider'
    ];

    function Config(
        $stateProvider,
        helper) {

        $stateProvider
            .state('app.menu', {
                url: '/menu',
                title: 'MENU OVERVIEW',
                controller: "MenuOverviewCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('menu/menu_overview.html')
            })
            .state('app.menu-editor', {
                url: '/menu/editor',
                title: 'MENU EDITOR',
                controller: "EditorCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('menu/editor/editor.html')
            })
            .state('app.menu-design', {
                url: '/menu/design',
                title: 'MENU DESIGN',
                controller: "DesignCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('menu/designer/designer.html')
            })
            .state('app.menu-settings', {
                url: '/menu/settings',
                title: 'MENU SETTINGS',
                controller: "SettingsCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('menu/settings/settings.html')
            })
    }
})();