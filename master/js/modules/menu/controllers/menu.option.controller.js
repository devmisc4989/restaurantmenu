(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuOptionCtrl', MenuOptionCtrl);

    MenuOptionCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'MenuElementsFactory',
        'MenusModel'
    ];

    function MenuOptionCtrl($rootScope, $scope, $mdDialog, MenuElementsFactory, MenusModel) {

        var vm = this;

        vm.remove_option = remove_option;
        vm.add_selection = add_selection;
        vm.update_option = update_option;
        vm.clear_price = clear_price;

        vm.test_fn = test_fn;

        vm.option_types = [];

        vm.show_remove_btn = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuOptionCtrl
         */
        function activate() {
            vm.option_types = get_option_types();

            $scope.$on('menu_object.remove_selection', function (event, data) {
                if ($scope.menuData.selection == data.selections) {
                    remove_selection(data.selection);
                }
            });
        }

        /**
         * @name remove_selection
         * @memberOf app.menu.MenuOptionCtrl
         */
        function remove_selection(item) {
            $scope.menuData.selection = _.reject($scope.menuData.selection,
                function (item_) {
                    return item == item_;
                });
        }

        /**
         * @name get_option_types
         * @memberOf app.menu.MenuOptionCtrl
         */
        function update_option(option) {
            //alert('Not yet implemented.');
        }


                /**
         * @name clear_price
         * @memberOf app.menu.MenuOptionCtrl
         */
        function test_fn($event) {
            $event.stopPropagation();
        }

        /**
         * @name clear_price
         * @memberOf app.menu.MenuOptionCtrl
         */
        function clear_price(item) {
            item.amount = "";
        }

        /**
         * @name get_option_types
         * @memberOf app.menu.MenuOptionCtrl
         */
        function get_option_types() {
             return MenusModel.option_types;
        }

        /**
         * @name remove_option
         * @memberOf app.menu.MenuOptionCtrl
         */
        function remove_option(option, menuData) {
            $rootScope.$broadcast('menu_object.remove_option', {
                option: option,
                options: menuData.options
            });
        }

        /**
         * @name add_selection
         * @memberOf app.menu.MenuOptionCtrl
         */
        function add_selection(menuData) {
            var menu_elements_factory = new MenuElementsFactory();
            var new_selection = menu_elements_factory.create_item(MenusModel.constants.SELECTION);
            if(menuData.selection) {
                menuData.selection.push(new_selection);
            }
            else {
                menuData.selection = [];
                menuData.selection.push(new_selection);
            }
        }
    }
})();
