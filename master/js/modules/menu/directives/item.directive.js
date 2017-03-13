/**
 * Item
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('item', item);

    /**
     * @namespace Item
     */
    function item($compile, MenusModel) {

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
            templateUrl: '/app/views/menu/editor/item.html',
            link: link
        };

        return directive;

        function link(scope, element, attributes, controller) {

            //scope.$watch('menuData', function (menuData) {
            //
            //    if(menuData) {
            //        _.each(menuData.items, function(single_item, index, list) {
            //            if(single_item.type == MenusModel.constants.ITEM) {
            //                var item = $compile("<item menu-data='" + menuData + "'></item>")(scope);
            //                element.parent().append(item);
            //            }
            //            if(single_item.type == MenusModel.constants.CATEGORY) {
            //                var group = $compile("<menu-category></menu-category>")(scope);
            //                element.parent().append(group);
            //            }
            //        });
            //        console.log("Menu Object", menuData);
            //    }
            //});
        }
    }
})();