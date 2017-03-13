(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuItemCtrl', MenuItemCtrl);

    MenuItemCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'MenuUtilsService',
        'ProductService',
        'MenusModel',
        'ProductsModel',
        'NotificationService',
        'Alert'
    ];

    function MenuItemCtrl($rootScope,
                          $scope,
                          $timeout,
                          MenuUtilsService,
                          ProductService,
                          MenusModel,
                          ProductsModel,
                          NotificationService,
                          Alert) {

        var vm = this;

        vm.select = select;
        vm.delete_item = delete_item;
        vm.swap_values = swap_values;
        vm.hard_delete = hard_delete;
        vm.add_product = add_product;
        vm.query_search = query_search;
        vm.selected_item_change = update_menu_model;
        vm.hide_dropdown = hide_dropdown;
        vm.on_select = on_select;
        vm.on_focus_title = on_focus_title;
        vm.on_focus_description = on_focus_description;
        vm.on_blur_description = on_blur_description;
        vm.active_update = active_update;
        vm.updateItem = updateItem;

        vm.show_more = false;
        vm.focused = false;
        vm.selected_from_product_list = false;
        vm.disable_name_input = true;
        vm.update_enable = false;

        var product = {};
        var menu_object = {};

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuItemCtrl
         */
        function activate() {
            $scope.$on('menu_object.preselect', function (event, data) {
                vm.mark_selected = data.item == $scope.menuData;
                vm.show_more = data.item ? vm.show_more : false;
            });

            $scope.$on('menu_object.uselectItem', function () {
                vm.update_enable = false;
            })

            if ($scope.menuData.title == '') {
                vm.disable_name_input = false;
            }
        }

        /**
         * @name select
         * @desc Select current menu object and save it to menu model
         * @memberOf app.menu.MenuItemCtrl
         */
        function select(item, $event) {
            MenuUtilsService.select(item, $event);
        }

        /**
         * @name hide_dropdown
         * @memberOf app.menu.MenuItemCtrl
         */
        function hide_dropdown(menuData) {
            $timeout(function () {
                vm.focused = false;
                if (!vm.selected_from_product_list && !vm.disable_name_input) { //&& !angular.equals(product, menuData)
                    menuData.name = '';
                }
                else {
                    vm.disable_name_input = true;
                }
                vm.selected_from_product_list = false;
            }, 300);
        }

        /**
         * @name on_focus_title
         * @memberOf app.menu.MenuItemCtrl
         */
        function on_focus_title(menuData) {
            product = angular.copy(menuData);
            vm.focused = true;
            //vm.update_enable = true;
        }

        /**
         * @name on_focus_description
         * @memberOf app.menu.MenuItemCtrl
         */
        function on_focus_description(menuData) {
            menu_object = angular.copy(menuData);
            //vm.update_enable = true;
        }

        /**
         * @name on_blur_description
         * @desc Adds item to 'modified_items' array to update all
         *       the related Products when Menu will be saved
         * @memberOf app.menu.MenuItemCtrl
         */
        function on_blur_description(menuData) {
            if ('product_id' in menuData) {
                if (!angular.equals(menu_object, menuData)) {
                    var index = _.findIndex(MenusModel.modified_items, function (item) {
                        return item.$$hashKey == menuData.$$hashKey;
                    });

                    if (index > -1) {
                        MenusModel.modified_items[index] = menuData;
                    }
                    else {
                        MenusModel.modified_items.push(menuData);
                    }
                }
            }
        }

        /**
         * @name delete_item
         * @desc Deletes selected menu object item
         * @memberOf app.menu.MenuItemCtrl
         */
        function delete_item(item) {
            MenuUtilsService.delete_item(item);
        }

        /**
         * @name hard_delete
         * @desc Deletes selected menu object item with Product related to it
         * @memberOf app.menu.MenuItemCtrl
         */
        function hard_delete(item) {
            open_delete_confirmation_dialog(item);
        }

        /**
         * @name add_product
         * @desc Creates new Product
         * @memberOf app.menu.MenuItemCtrl
         */
        function add_product(item) {
            vm.selected_from_product_list = true;

            product = {
                title: item.title,
                description: item.description
            };

            ProductService.create(product).then(create_success_fn, create_error_fn);

            function create_success_fn(data) {
                NotificationService.give_success_feedback(ProductsModel.feedback.create_success);
                update_menu_model(data.data, item);
                return data.data;
            }

            function create_error_fn(data) {
                console.log("err: ", data);
                item.name = '';
                NotificationService.give_error_feedback(ProductsModel.feedback.create_fail);
            }
        }

        /**
         * @name query_search
         * @desc Looks for Product list for typeahead
         * @memberOf app.menu.MenuItemCtrl
         */
        function query_search(search_text) {
            var query = {where: {name: {contains: search_text}}, limit: ProductsModel.LIMIT};

            return ProductService.find(query).then(find_success_fn, find_error_fn);

            function find_success_fn(data) {
                return data.data;
            }

            function find_error_fn(data) {
                console.log("err: ", data);
                // TODO display toaster here
            }
        }

        /**
         * @name update_menu_model
         * @desc Steps to perform when Product is selected from Product list
         * @memberOf app.menu.MenuItemCtrl
         */
        function on_select(item, menuData, model, event) {
            vm.selected_from_product_list = true;
            update_menu_model(item, menuData, model, event);
        }

        /**
         * @name update_menu_model
         * @desc Updates Menu Object model with a data from Product which has been selected
         * @memberOf app.menu.MenuItemCtrl
         */
        function update_menu_model(item, menuData, model, event) {
            if (item && item.title) {
                menuData.title = item.title;
                menuData.product_id = item.id;
                menuData.description = item.description;
            }

        }

        /**
         * @name swap
         * @desc Swaps the values of the fixed price item
         * @memberOf app.menu.FixedPriceItemCtrl
         */
        function swap_values(item) {
            console.log(item);
            var temp = item.values[0];
            item.values[0] = item.values[1];
            item.values[1] = temp;
            console.log(item);
        }

        /**
         * @name open_delete_confirmation_dialog
         * @desc Displays confirmation dialog and calls Delete Item function
         * @memberOf app.menu.MenuItemCtrl
         */
        function open_delete_confirmation_dialog(item) {
            var item_name = item.name ? item.name : _.find(item.values, function (n) {
                return n.type == 'description'
            }).value;
            var callback_fn = function (params) {
                MenuUtilsService.delete_item(params.item);
                $scope.$apply();
            };
            var callback_fn_params = {item: item};

            Alert.confirm_deletion(item_name, callback_fn, callback_fn_params);
        }

        function active_update() {
            vm.update_enable = true;
            vm.disable_name_input = false;
        }

        function updateItem() {
            $rootScope.$broadcast('menu_object.updateItem');
        }

    }
})();
