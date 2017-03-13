///**
// * Typeahead
// * @namespace app.menu.directives
// */
//(function () {
//    'use strict';
//
//    angular
//        .module('app.menu.directives')
//        .directive('typeahead', typeahead);
//
//    /**
//     * @namespace Typeahead
//     */
//    function typeahead($compile, MenusModel) {
//
//        /**
//         * @name directive
//         * @desc The directive to be returned
//         * @memberOf app.menu.directives.menus
//         */
//        var directive = {
//            restrict: 'A',
//            //controller: controller,
//            //controllerAs: 'vm',
//            //link: link
//        };
//
//        return directive;
//
//        function controller($scope, element, attributes, controller) {
//
//            var a =1;
//
//            //scope.$watch('menuData', function (menuData) {
//            //
//            //    if(menuData) {
//            //        _.each(menuData.typeaheads, function(single_typeahead, index, list) {
//            //            if(single_typeahead.type == MenusModel.constants.ITEM) {
//            //                var typeahead = $compile("<typeahead menu-data='" + menuData + "'></typeahead>")(scope);
//            //                element.parent().append(typeahead);
//            //            }
//            //            if(single_typeahead.type == MenusModel.constants.CATEGORY) {
//            //                var group = $compile("<menu-category></menu-category>")(scope);
//            //                element.parent().append(group);
//            //            }
//            //        });
//            //        console.log("Menu Object", menuData);
//            //    }
//            //});
//        }
//    }
//})();