/**
 * menuSelection
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuSelection', menuSelection);

    /**
     * @namespace menuSelection
     */
    function menuSelection($compile, MenusModel) {

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
            controller: 'MenuSelectionCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.selection.html'
        };

        return directive;
    }
})();