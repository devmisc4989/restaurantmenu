(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuCategoryHeaderCtrl', MenuCategoryHeaderCtrl);

    MenuCategoryHeaderCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuUtilsService',
        'MenuService',
        'MenusModel'
    ];

    function MenuCategoryHeaderCtrl($rootScope, $scope, MenuUtilsService, MenuService, MenusModel) {

        var vm = this;

        vm.select = select;
        vm.delete_item = delete_item;
        vm.add_subcategory = add_subcategory;

        vm.show_more = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuCategoryHeaderCtrl
         */
        function activate() {
            $scope.$on('menu_object.preselect', function (event, data) {
                vm.mark_selected = data.item == $scope.menuData;
                vm.show_more = data.item ? vm.show_more : false;
            });
        }

        /**
         * @name select
         * @desc Selects current menu object and saves it to menu model
         * @memberOf app.menu.MenuCategoryHeaderCtrl
         */
        function select(item, $event) {
            MenuUtilsService.select(item, $event);
        }

        /**
         * @name delete_item
         * @desc Deletes selected menu object item
         * @memberOf app.menu.MenuCategoryHeaderCtrl
         */
        function delete_item(item) {
            MenuUtilsService.delete_item(item);
        }

        /**
         * @name add_subcategory
         * @desc Adds new 'subcategory' item
         * @memberOf app.menu.MenuCategoryHeaderCtrl
         */
        function add_subcategory() {
            $rootScope.$broadcast('menu_object.add', {
                type: MenusModel.constants.SUBCATEGORY
            });
        }
    }
})();
