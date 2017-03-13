/**
 * Menus
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menus', menus);

    /**
     * @namespace Menus
     */
    function menus() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.menu.directives.menus
         */
        var directive = {
            controller: 'MenusCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                menus: '=',
                menuType: '@menuType',
                sortable: '=sortable'
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return resolve_template(scope.sortable);
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

    function resolve_template(sortable) {
        if (sortable) {
            return '/app/views/menu/menus-sortable.html'
        }
        else {
            return '/app/views/menu/menus.html';
        }
    }
})();