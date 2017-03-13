/**
 * Prices
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('prices', prices);

    /**
     * @namespace Prices
     */
    function prices($compile, MenusModel) {

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
            controller: 'MenuPricesCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/prices.html'
        };

        return directive;
    }
})();