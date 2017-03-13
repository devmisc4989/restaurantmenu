/**
 * Note
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('note', note);

    /**
     * @namespace Note
     */
    function note() {

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
            controller: 'MenuItemCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/note.html'
        };

        return directive;
    }
})();