(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuToolbarCtrl', MenuToolbarCtrl);

    MenuToolbarCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'MenuService',
        'MenusModel'
    ];

    function MenuToolbarCtrl($rootScope, $scope, $mdDialog, MenuService, MenusModel) {

        var vm = this;

        vm.add_item = add_item;
        vm.add_fixed_price_item = add_fixed_price_item;
        vm.add_category = add_category;
        vm.add_note = add_note;
        vm.menu_has_fixed_price_item = menu_has_fixed_price_item;

        vm.mark_selected = true;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function activate() {

            $scope.$on('menu_object.preselect', function (event, data) {
                MenusModel.currently_selected_item = data.item;
                //vm.mark_selected = data.item != null;
            });

            $scope.$on('menu_object.select', function (event, data) {
                if(!vm.small_screen) {
                    vm.style = { "top": data.top - 118 };
                }
            });

            $scope.$on('menu_object.delete', function (event, data) {
                if (data.item) {
                    vm.fixed_price_added = !(data.item.type == 'fixedPrice');
                }
            });

            var query;
            if (MenusModel.selected_menu.id) {
                query = MenusModel.selected_menu.id;
            }
            else {
                //TODO redirect here
                //$state.go('app.menu')
                query = "57c715ba2356ac0300d46849";
            }

            get_menu_object_data(query);
        }

        /**
         * @name add_item
         * @desc Adds new 'item' item
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function add_item() {
            $rootScope.$broadcast('menu_object.add', {
                type: MenusModel.constants.ITEM
            });
        }

        /**
         * @name add_category
         * @desc Adds new 'category' item
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function add_category() {
            $rootScope.$broadcast('menu_object.add', {
                type: MenusModel.constants.CATEGORY
            });
        }

        /**
         * @name add_note
         * @desc Adds new 'note' item
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function add_note() {
            $rootScope.$broadcast('menu_object.add', {
                type: MenusModel.constants.NOTE
            });
        }

        /**
         * @name add_fixed_price_item
         * @desc Adds a new item of the fixedPrice type
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function add_fixed_price_item() {
            $rootScope.$broadcast('menu_object.add', {
                type: MenusModel.constants.FIXED_PRICE_ITEM
            });
            vm.fixed_price_added = true;
        }

        function menu_has_fixed_price_item() {
            return _.find(vm.menu_object.items, function (n) { return n.type == 'fixedPrice'}) || vm.fixed_price_added;
        }

        /**
         * @name get_menu_object_data
         * @desc Retrieve menu list
         * @memberOf app.menu.MenuToolbarCtrl
         */
        function get_menu_object_data(query) {
            MenuService.get(query).then(find_success_fn, find_error_fn);

            function find_success_fn(data, status, headers, config) {
                vm.menu_object_raw = angular.copy(data.data);
                vm.menu_object = MenuService.normalize(angular.copy(data.data));
            }

            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                // TODO display toaster here
            }
        }
    }
})();
