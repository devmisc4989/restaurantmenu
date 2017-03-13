/**
 * StatusChanger
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('statusChanger', statusChanger);

    /**
     * @namespace StatusChanger
     */
    function statusChanger() {

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
            controller: 'MenuStatusChangerCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.status_changer.html'
        };

        return directive;
    }
})();