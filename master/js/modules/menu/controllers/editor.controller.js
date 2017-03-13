(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('EditorCtrl', EditorCtrl);

    EditorCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        '$window',
        'MenuService',
        'MenusModel',
        'MenuObjectBuilder',
        'NotificationService',
        'PublishedService',
        'ProductsModel',
        'ProductService'
    ];

    function EditorCtrl($rootScope,
                        $scope,
                        $q,
                        $window,
                        MenuService,
                        MenusModel,
                        MenuObjectBuilder,
                        NotificationService,
                        PublishedService,
                        ProductsModel,
                        ProductService) {

        var vm = this;

        vm.save = save;
        vm.unselect = unselect;
        vm.update = update;
        vm.give_not_yet_implemented_feedback = give_not_yet_implemented_feedback;
        vm.menu_object = {};
        vm.menu_object_raw = {};
        vm.selected_menu = {};
        vm.menus = [];
        vm.updateItem = updateItem;

        var menu_object_changed = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.EditorCtrl
         */
        function activate() {

            vm.selected_menu = MenusModel.selected_menu;

            var query = {};

            if (MenusModel.selected_menu.id) {
                query = MenusModel.selected_menu.id;
            }
            else {
                //TODO redirect here
                //$state.go('app.menu')
                query = "57c715ba2356ac0300d46849";
            }

            if (MenusModel.menus.length) {
                vm.menus = MenusModel.menus;
            }
            else {
                //TODO redirect here
                //$state.go('app.menu')
            }

            get_menu_object_data(query);

            configure_layout();
            initialize_leave_protection();
            initialize_listeners();
            initialize_ngsortable();
        }

        /**
         * @name are_you_sure_prompt
         * @desc Displays prompt asking if user wants to leave the page
         * @memberOf app.menu.EditorCtrl
         */
        function initialize_leave_protection() {
            var message = "Are you sure you want to leave this page?";

            $scope.$on('$stateChangeStart', function (event) {
                if (menu_object_changed) {
                    are_you_sure_prompt(message);
                }
            });

            $window.onbeforeunload = function (event) {
                if (menu_object_changed) {
                    if (typeof event == 'undefined') {
                        event = $window.event;
                    }
                    if (event) {
                        event.returnValue = message;
                    }
                    return message;
                }
            };

            /**
             * @name are_you_sure_prompt
             * @desc Displays prompt asking if user wants to leave the page
             * @memberOf app.menu.EditorCtrl
             */
            function are_you_sure_prompt(message) {
                var answer = confirm(message);
                if (!answer) {
                    event.preventDefault();
                }
            }
        }

        /**
         * @name initialize_ngsortable
         * @desc Please checkout the docs: https://github.com/a5hik/ng-sortable
         * Consider this lib: http://angular-ui-tree.github.io/angular-ui-tree/#/basic-example
         * @memberOf app.menu.EditorCtrl
         */
        function initialize_ngsortable() {
            vm.sort_options = {
                accept: function (sourceItemHandleScope, destSortableScope) {
                    return function () {
                        if (sourceItemHandleScope.itemScope.item.type == MenusModel.constants.SUBCATEGORY) {
                            return false;
                        }
                        //return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                        return true;
                    }();
                },
                itemMoved: function (event) {
                },
                orderChanged: function (event) {
                },
                containerPositioning: 'relative',
                containment: '#sortable-container'
            };
        }

        /**
         * @name initialize_listeners
         * @desc Place here all of the '$watch' and '$scope.on' functions.
         * @memberOf app.menu.EditorCtrl
         */
        function initialize_listeners() {
            $scope.$watch('vm.menu_object', function (newVal, oldVal) {
                if (newVal.id && oldVal.id) {
                    menu_object_changed = true; //To prevent users from leaving with unsaved Menu Object
                }
                //console.log('changed:', vm.menu_object);
            }, true);

            $scope.$on('menu_object.add', function (event, data) {
                MenuObjectBuilder.add_item(data.type, vm.menu_object.items);
            });

            $scope.$on('menu_object.delete', function (event, data) {
                del(data);
            });

            $scope.$on('menu_object.save', function (event, data) {
                save();
            });

            $scope.$on('menu_object.unpublish', function (event, data) {
                PublishedService.unpublish(vm.menu_object);
            });

            $scope.$on('menu_object.update', function (event, data) {
                PublishedService.update_published(vm.menu_object);
            });

            $scope.$on('menu_object.publish', function (event, data) {
                PublishedService.publish(vm.menu_object);
            });

            $scope.$on('menu_object.changed', function (event, data) {
                menu_object_changed = data.status;
            });
            $scope.$on('menu_object.updateItem', function (event, data) {
                updateItem(vm.menu_object);
            });
        }

        /**
         * @name update
         * @desc Retrieve menu list
         * @memberOf app.menu.EditorCtrl
         */
        function update() {
            get_menu_object_data(vm.selected_menu.id);
        }

        /**
         * @name save
         * @desc Runs all of required functions to save the Menu Object properly
         * @memberOf app.menu.EditorCtrl
         */
        function save() {
            var promises = [save_menu_object(), update_products()];
            $q.all(promises)
                .then(delete_products());
        }

        /**
         * @name del
         * @desc Runs all of required functions to delete the Menu Object properly
         * @memberOf app.menu.EditorCtrl
         */
        function del(data) {
            if ('product_id' in data.item) {
                ProductsModel.products_to_be_deleted.push(data.item.product_id);
            }
            MenuObjectBuilder.delete_item(data.item, vm.menu_object.items);
            NotificationService.give_success_feedback(ProductsModel.feedback.destroy_success);
        }

        /**
         * @name save_menu_object
         * @desc Saves menu object
         * @memberOf app.menu.EditorCtrl
         */
        function save_menu_object() {
            return MenuService.save(vm.menu_object, false);
        }

        /**
         * @name save_menu_object
         * @desc Saves menu object
         * @memberOf app.menu.EditorCtrl
         */
        function update_products() {
            return ProductService.update_products().then(success_fn, error_fn);

            function success_fn(data) {
            }

            function error_fn(data) {
                NotificationService.give_error_feedback(ProductsModel.feedback.update_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name get_businesses
         * @desc Retrieve menu list
         * @memberOf app.menu.EditorCtrl
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

        /**
         * @name delete_products
         * @desc Delete all products that are bind to deleted items
         * @memberOf app.menu.EditorCtrl
         */
        function delete_products() {
            return ProductService.delete_products().then(success_fn, error_fn);

            function success_fn(data) {
            }

            function error_fn(data) {
                NotificationService.give_error_feedback(ProductsModel.feedback.destroy_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name give_not_yet_implemented_feedback
         * @desc This is just for tests and can be later deleted
         * @memberOf app.menu.EditorCtrl
         */
        function give_not_yet_implemented_feedback() {
            NotificationService.give_error_feedback('This feature is not yet implemented');
        }

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.EditorCtrl
         */
        function update_sub_top_nav() {
            $rootScope.app.layout.hasSubTopNavBar = true;
            $rootScope.subtopnavbar = {
                tabId: 0,
                navBack: {
                    uri: 'app.menu',
                    title: 'Menu Overview'
                },
                items: [
                    {title: 'Editor', state: 'app.menu-editor', iconClass: 'icon-profile'},
                    {title: 'Designer', state: 'app.menu-design', iconClass: 'icon-manage-apps'},
                    {title: 'Settings', state: 'app.menu-settings', iconClass: 'icon-settings'}
                ]
            };
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.menu.EditorCtrl
         */
        function configure_layout() {
            update_sub_top_nav();

            $rootScope.$broadcast('topnavbar.update', {
                title: MenusModel.current_business.name ? MenusModel.current_business.name : 'Editor'
            });

            $rootScope.$broadcast('subtopnavbar.update', {
                uri: 'app.menu',
                title: 'Menu Overview'
            });

            NotificationService.configure({subnavbar: true});
        }

        /**
         * @name unselect
         * @desc Unselects Menu Object item
         * @memberOf app.menu.EditorCtrl
         */
        function unselect() {
            $rootScope.$broadcast('menu_object.preselect', {
                item: null
            });
            $rootScope.$broadcast('menu_object.uselectItem');
        }

        /**
         * @name updateItem
         * @desc Update Menu item
         * @memberOf app.menu.EditorCtrl
         */
        function updateItem(item) {
            MenuService.save(item, true)
            .then(success_fn, error_fn);

            function success_fn() {
                NotificationService.give_success_feedback(ProductsModel.feedback.update_success);
                
            }
            function error_fn() {
                NotificationService.give_success_feedback(ProductsModel.feedback.update_fail);
            }
        }
    }
})();
