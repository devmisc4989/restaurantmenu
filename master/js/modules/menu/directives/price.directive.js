/**
 * Price
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('price', price);

    /**
     * @namespace Price
     */
    function price($compile, MenusModel) {

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
            controller: 'MenuPriceCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/price.html'
        };

        return directive;
    }
})();