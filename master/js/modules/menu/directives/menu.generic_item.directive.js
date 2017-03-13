/**
 * MenuGenericItem
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuGenericItem', menuGenericItem);

    /**
     * @namespace MenuGenericItem
     */
    function menuGenericItem($compile, MenusModel) {

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
            link: link,
            template: '<div ng-include="getContentUrl()"></div>'

        };

        return directive;

        function link(scope, element, attributes, controller) {
            scope.getContentUrl = function () {
                return resolve_template(scope.menuData);
            };
        }

        function resolve_template(menuData) {
            if(menuData.type == MenusModel.constants.CATEGORY) {
                return '/app/views/menu/editor/menu.category.html'
            }
            if(menuData.type == MenusModel.constants.SUBCATEGORY) {
                return '/app/views/menu/editor/menu.subcategory.html'
            }
            if(menuData.type == MenusModel.constants.ITEM) {
                return '/app/views/menu/editor/item.html'
            }
            if(menuData.type == MenusModel.constants.NOTE) {
                return '/app/views/menu/editor/note.html'
            }
            if (menuData.type == MenusModel.constants.FIXED_PRICE_ITEM) {
                return '/app/views/menu/editor/fixed_price_item.html'
            }
        }
    }
})();