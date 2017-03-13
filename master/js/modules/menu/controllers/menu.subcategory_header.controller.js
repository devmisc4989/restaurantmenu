(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuSubcategoryHeaderCtrl', MenuSubcategoryHeaderCtrl);

    MenuSubcategoryHeaderCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuUtilsService',
        'MenuService',
        'MenusModel'
    ];

    function MenuSubcategoryHeaderCtrl($rootScope, $scope, MenuUtilsService, MenuService, MenusModel) {

        var vm = this;

        vm.select = select;
        vm.delete_item = delete_item;

        vm.show_more = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuSubcategoryHeaderCtrl
         */
        function activate() {
            $scope.$on('menu_object.preselect', function (event, data) {
                vm.mark_selected = data.item == $scope.menuData;
                vm.show_more = data.item ? vm.show_more : false;
            });
        }

        /**
         * @name select
         * @desc Select current menu object and save it to menu model
         * @memberOf app.menu.MenuSubcategoryHeaderCtrl
         */
        function select(item, $event) {
            MenuUtilsService.select(item, $event);
        }

        /**
         * @name delete_item
         * @desc Deletes selected menu object item
         * @memberOf app.menu.MenuSubcategoryHeaderCtrl
         */
        function delete_item(item) {
            MenuUtilsService.delete_item(item);
        }
    }
})();
