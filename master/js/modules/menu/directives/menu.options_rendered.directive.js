/**
 * menuOptionsRendered
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuOptionsRendered', menuOptionsRendered);

    /**
     * @namespace menuOptionsRendered
     */
    function menuOptionsRendered($compile, MenusModel) {

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
            templateUrl: '/app/views/menu/editor/menu.options_rendered.html'
        };

        return directive;
    }
})();