/**
 * MenuCategoryHeader
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuCategoryHeader', menuCategoryHeader);

    /**
     * @namespace MenuCategoryHeader
     */
    function menuCategoryHeader() {

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
            controller: 'MenuCategoryHeaderCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.category_header.html'
        };

        return directive;
    }
})();