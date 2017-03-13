/**
 * MenuEditor
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('menuEditor', menuEditor);

    /**
     * @namespace MenuEditor
     */
    function menuEditor($compile, MenusModel) {

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
            templateUrl: '/app/views/menu/editor/menu.editor.html'
            //link: link
        };

        return directive;       

        //function link(scope, element, attributes, controller) {
        //    var newScope = {};
        //
        //    function update(menuData) {
        //        if(menuData) {
        //            _.each(menuData.items, function (single_item, index, list) {
        //
        //                if (single_item.type == MenusModel.constants.ITEM) {
        //                    newScope = scope.$new(true);
        //                    newScope.data = single_item;
        //
        //                    var item = $compile(MenusModel.htmls.item)(newScope);
        //                    element.append(item);
        //                }
        //                if (single_item.type == MenusModel.constants.CATEGORY) {
        //                    newScope = scope.$new(true);
        //                    newScope.data = single_item;
        //
        //                    var group = $compile(MenusModel.htmls.category)(newScope);
        //                    element.append(group);
        //                }
        //            });
        //        }
        //    }
        //
        //    scope.$watchCollection('menuData.items', function (new_data, old_data) {
        //        //console.log('menuData changed:', scope.menuData);
        //        if(new_data != old_data) {
        //            update(scope.menuData);
        //        }
        //    });

            //scope.$watch(attributes.menuData, function (menuData) {
            //    console.log('2menuData changed:', menuData);
            //    update(menuData);
            //}, true);
            //
            //scope.$watch('vm.menu_object', function (menuData) {
            //    console.log('menuData changed:', menuData);
            //    update(menuData);
            //}, true);

            //scope.$watch(function(){return vm.menu_object;}, function (menuData) {
            //    console.log('menuData changed:', menuData);
            //    update(menuData);
            //});

            //scope.$watch(function(){return attributes.menuData;}, function (menuData) {
            //    console.log('menuData changed:', menuData);
            //    update(menuData);
            //}, true);

        //}
    }
})();