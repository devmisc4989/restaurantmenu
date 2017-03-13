/**
 * MenuHeader
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuHeader', menuHeader);

    /**
     * @namespace MenuHeader
     */
    function menuHeader($compile, MenusModel) {

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
            controller: 'MenuHeaderCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.header.html'
        };

        return directive;
    }
})();