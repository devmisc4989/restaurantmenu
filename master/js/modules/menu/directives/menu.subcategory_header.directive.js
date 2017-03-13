/**
 * MenuSubcategoryHeader
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuSubcategoryHeader', menuSubcategoryHeader);

    /**
     * @namespace MenuSubcategoryHeader
     */
    function menuSubcategoryHeader($compile, MenusModel) {

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
            controller: 'MenuSubcategoryHeaderCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.subcategory_header.html'
        };

        return directive;
    }
})();