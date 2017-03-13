/**
 * MenuSubcategory
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuSubcategory', menuSubcategory);

    /**
     * @namespace MenuSubcategory
     */
    function menuSubcategory($compile, MenusModel) {

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
            controller: 'MenuSubcategoryCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.subcategory.html'
            //link: link
        };

        return directive;

        function link(scope, element, attributes, controller) {
            var newScope = {};

            var item = $compile(MenusModel.htmls.subcategory_header)(scope);
            element.append(item);

            scope.$watch('menuData', function (menuData) {

                if (menuData) {
                    _.each(menuData.items, function (single_item, index, list) {

                        if (single_item.type == MenusModel.constants.ITEM) {
                            newScope = scope.$new(true);
                            newScope.data = single_item;

                            var item = $compile(MenusModel.htmls.item_within_subcategory)(newScope);
                            element.append(item);
                        }
                    });
                    console.log("Menu Object", menuData);
                }
            });
        }
    }
})();