/**
 * menuOptionRendered
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuOptionRendered', menuOptionRendered);

    /**
     * @namespace menuOptionRendered
     */
    function menuOptionRendered($compile, MenusModel) {

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
            templateUrl: '/app/views/menu/editor/menu.option_rendered.html'
        };

        return directive;
    }
})();