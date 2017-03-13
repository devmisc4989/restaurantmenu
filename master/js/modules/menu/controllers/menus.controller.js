(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenusCtrl', MenusCtrl);

    MenusCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        'Alert',
        'MenuService',
        'PublishedService',
        'MenusModel',
        'NotificationService'
    ];

    function MenusCtrl($rootScope,
                       $scope,
                       $q,
                       Alert,
                       MenuService,
                       PublishedService,
                       MenusModel,
                       NotificationService) {

        var vm = this;

        vm.get_menus = get_menus;
        vm.remove_from_list = remove_from_list;

        vm.items = [];
        vm.sort_options = {};
        vm.menu_type = '';
        vm.selected = null;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenusCtrl
         */
        function activate() {
            vm.menu_type = $scope.menuType;

            $scope.$on('menu_list.add', function (event, data) {
                if (vm.menu_type == MenusModel.constants.DRAFT) {
                    vm.items.push(data.item);
                }
            });

            $scope.$on('menu_list.update', function (event, data) {
                MenusModel.current_business = data.business;
                get_menus({where: {business: MenusModel.current_business.id}});
            });

            $scope.$on('menu_list.destroy_menu', function (event, data) {
                if ($scope.menuType == data.type) {
                    open_delete_confirmation_dialog(data.item, data.type);
                }
            });

            /**
             * @name sort_options
             * @desc Please checkout the docs: https://github.com/a5hik/ng-sortable
             * @memberOf app.menu.MenusCtrl
             */
            vm.sort_options = {
                itemMoved: function (event) {
                },
                orderChanged: function (event) {
                    update_menu_list();
                },
                containerPositioning: 'relative'
            };
        }

        /**
         * @name update_menu_list
         * @desc Deletes selected menu from the currently displayed list and from the database
         * @memberOf app.menu.MenusCtrl
         */
        function update_menu_list() {
            var data = {
                id: MenusModel.current_published_menus_id,
                menus: vm.items
            };

            PublishedService.update(data).then(update_success_fn, update_error_fn);

            /**
             * @name update_success_fn
             * @desc Update list array on view
             */
            function update_success_fn(data, status, headers, config) {
                NotificationService.give_success_feedback(MenusModel.feedback.update_menu_list_success);
                console.log('updated: ', data.data);
            }

            /**
             * @name update_error_fn
             * @desc Show snackbar with error
             */
            function update_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(MenusModel.feedback.update_menu_list_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name destroy_menu
         * @desc Deletes selected menu from the currently displayed list and from the database
         * @memberOf app.menu.MenusCtrl
         */
        function destroy_menu(params) {
            var item = params.item;
            var type = params.type;

            var menu = item;
            var result = remove_from_list_by_id(vm.items, item);

            if (result.removed) {
                vm.items = result.new_list;

                if (type == MenusModel.constants.DRAFT) {
                    var promise = MenuService.destroy(item); //.then(destroy_success_fn, destroy_error_fn);
                    promise.then(destroy_success_fn, destroy_error_fn);

                    return promise;
                }
                else if (type == MenusModel.constants.PUBLISHED) {
                    return MenuService.destroy({id:item.id}).then(destroy_success_fn, destroy_error_fn);
                    //var promises = [MenuService.destroy({id: item.id}), PublishedService.del(item)];
                    //return $q.all(promises).then(destroy_success_fn, destroy_error_fn);
                }
            }

            /**
             * @name destroy_success_fn
             * @desc Update list array on view
             */
            function destroy_success_fn(data, status, headers, config) {
                NotificationService.give_success_feedback(MenusModel.feedback.destroy_menu_success);
                console.log('removed: ', data.data);
            }

            /**
             * @name destroy_error_fn
             * @desc Show snackbar with error
             */
            function destroy_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(MenusModel.feedback.destroy_menu_fail);
                vm.items.unshift(menu);
                console.log("err: ", data);
            }
        }

        /**
         * @name get_menus
         * @desc Retrieve menu list
         * @memberOf app.menu.MenusCtrl
         */
        function get_menus(query) {
            if ($scope.menuType == MenusModel.constants.DRAFT) {
                MenuService.find(query).then(drafts_success_fn, drafts_error_fn);
            }
            else if ($scope.menuType == MenusModel.constants.PUBLISHED) {
                PublishedService.find(query).then(published_success_fn, published_error_fn);
            }

            /**
             * @name drafts_success_fn
             * @desc Update list array on view
             */
            function drafts_success_fn(data, status, headers, config) {
                console.log('DRAFTS (MenuService): ', data.data);
                MenusModel.menus = MenuService.normalize_all(data.data);
                vm.items = filter_published(MenusModel.menus, MenusModel.published_menus);
            }

            /**
             * @name drafts_error_fn
             * @desc Show snackbar with error
             */
            function drafts_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(MenusModel.feedback.retrieve_menu_drafts_fail);
                console.log("err: ", data);
            }

            /**
             * @name published_success_fn
             * @desc Update list array on view
             */
            function published_success_fn(data, status, headers, config) {
                console.log('PUBLISHED (PublishedService): ', data.data);
                if (data.data.length && data.data[0].menus) {
                    vm.items = MenuService.normalize_all(data.data[0].menus);
                    MenusModel.published_menus = vm.items;
                    MenusModel.published = data.data[0];
                    MenusModel.published.menus = vm.items;
                    MenusModel.current_published_menus_id = data.data[0].id;
                }
            }

            /**
             * @name published_error_fn
             * @desc Show snackbar with error
             */
            function published_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(MenusModel.feedback.retrieve_menu_published_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name filter_published
         * @desc Delete all published menu items from provided list
         * @returns {Array} of drafts of menu items
         */
        function filter_published(drafts, published) {
            return _.reject(drafts, function (element) {
                return _.findWhere(published, {id: element.id});
            });
        }

        /**
         * @name remove_from_list_by_id
         * @desc Removes item from the currently displayed list
         * @returns {Array} of items without removed item
         */
        function remove_from_list_by_id(list, item) {
            var list_lenght = list.length;

            var new_list = _.reject(list, function (element) {
                return _.findWhere([item], {id: element.id});
            });

            var removed = list_lenght > new_list.length;

            return {new_list: new_list, removed: removed};
        }

        /**
         * @name remove_from_list
         * @desc If an element was dragged away, elements has to be removed from
         * the original list.
         * @memberOf app.menu.MenusCtrl
         */
        function remove_from_list(index) {
            vm.items.splice(index, 1);
        }

        /**
         * @name open_delete_confirmation_dialog
         * @memberOf app.menu.MenusCtrl
         */
        function open_delete_confirmation_dialog(item, type) {
            var item_name = item.title;
            var callback_fn = function (params) {
                destroy_menu(params);
            };
            var callback_fn_params = {item: item, type: type};

            Alert.confirm_deletion(item_name, callback_fn, callback_fn_params);
        }
    }
})
();
