/**
 * MenuCategory
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuCategory', menuCategory);

    /**
     * @namespace MenuCategory
     */
    function menuCategory($compile, MenusModel) {

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
            controller: 'MenuCategoryCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/menu.category.html'
            //link: link
        };

        return directive;

        function link(scope, element, attributes, controller) {
            var newScope = {};

            var item = $compile(MenusModel.htmls.category_header)(scope);
            element.append(item);

            scope.$watch('menuData', function (menuData) {
                if (menuData) {
                    _.each(menuData.items, function(single_item, index, list) {

                        if(single_item.type == MenusModel.constants.ITEM) {
                            newScope = scope.$new(true);
                            newScope.data = single_item;

                            var item = $compile(MenusModel.htmls.item_within_category)(newScope);
                            element.append(item);
                        }
                        if(single_item.type == MenusModel.constants.SUBCATEGORY) {
                            newScope = scope.$new(true);
                            newScope.data = single_item;

                            var group = $compile(MenusModel.htmls.subcategory)(newScope);
                            element.append(group);
                        }
                    });
                    //console.log("Menu Object", menuData);
                }
            });
        }
    }
})();