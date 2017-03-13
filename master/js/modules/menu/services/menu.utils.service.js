/**
 * MenuUtilsService
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('MenuUtilsService', MenuUtilsService);

    MenuUtilsService.$inject = ['$rootScope', '$timeout'];

    /**
     * @namespace MenuUtilsService
     * @returns {MenuUtilsService}
     */
    function MenuUtilsService($rootScope, $timeout) {
        var MenuUtilsService = {
            get_element_offset: get_element_offset,
            select: select,
            delete_item: delete_item
        };

        return MenuUtilsService;

        ////////////////////

        /**
         * @name get_element_offset
         * @desc Returns the offset top and left values of an element
         * @returns {Object}
         * @memberOf app.menu.services.MenuUtilsService
         **/
        function get_element_offset(element) {
            var de = document.documentElement;
            var box = element.getBoundingClientRect();
            var top = box.top + window.pageYOffset - de.clientTop;
            var left = box.left + window.pageXOffset - de.clientLeft;
            return {top: top, left: left};
        }

        /**
         * @name select
         * @desc Select current menu object and save it to menu model
         * @memberOf app.menu.MenuUtilsService
         */
        function select(item, $event) {
            $event.stopPropagation();
            $rootScope.$broadcast('menu_object.preselect', {
                item: item
            });

            $timeout(function () {
                var top = MenuUtilsService.get_element_offset($event.currentTarget).top;
                $rootScope.$broadcast('menu_object.select', {
                    item: item,
                    top: top
                });
            }, 150);
        }

        /**
         * @name delete_item
         * @desc Deletes selected menu object item
         * @memberOf app.menu.MenuUtilsService
         */
        function delete_item(item) {
            $rootScope.$broadcast('menu_object.delete', {
                item: item
            });
        }
    }
})();