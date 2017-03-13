/**
 * menuOptions
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuOptions', menuOptions);

    /**
     * @namespace menuOptions
     */
    function menuOptions($compile, MenusModel) {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.menu.directives.menus
         */
        var directive = {
            restrict: 'E',
            scope: {
                menuData: '='
            },
            controller: 'MenuOptionsCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.options.html'
        };

        return directive;
    }
})();