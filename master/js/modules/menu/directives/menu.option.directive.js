/**
 * menuOption
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuOption', menuOption);

    /**
     * @namespace menuOption
     */
    function menuOption($compile, MenusModel) {

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
            controller: 'MenuOptionCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.option.html'
        };

        return directive;
    }
})();