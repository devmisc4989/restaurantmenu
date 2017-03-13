(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuOverviewCtrl', MenuOverviewCtrl);

    MenuOverviewCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'BusinessService',
        'NotificationService',
        'MenusModel'
    ];

    function MenuOverviewCtrl($rootScope, $scope, $mdDialog, BusinessService, NotificationService, MenusModel) {

        var vm = this;

        vm.new_menu = new_menu;
        vm.businesses = [];
        vm.selected_business = '';

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuOverviewCtrl
         */
        function activate() {
            // When new business is selected menu list should be updated
            $scope.$watch('vm.selected_business', function () {
                if (vm.selected_business) {
                    $rootScope.$broadcast('menu_list.update', {
                        business: vm.selected_business
                    });
                }
            });

            configure_layout();
            get_businesses();
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.menu.MenuOverviewCtrl
         */
        function configure_layout() {
            $rootScope.$broadcast('topnavbar.update', {
                title: 'MENU OVERVIEW'
            });

            // THIS SHOULD BE DELETED
            $rootScope.app.layout.hasSubTopNavBar = false;

            // IN FAVOR TO THIS:
            $rootScope.$broadcast('layout.update', {
                has_sub_topnavbar: false
            });

            NotificationService.configure({subnavbar: false});
        }

        /**
         * @name new_menu
         * @desc Create new menu
         * @memberOf app.menu.MenuOverviewCtrl
         */
        function new_menu($event) {
            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: "/app/views/menu/dialogs/menu.add.html",
                clickOutsideToClose: true,
                escapeToCl_ose: true,
                controllerAs: 'vm',
                controller: "MenuAddDialogCtrl"
            }).then(dialog_success_fn);

            /**
             * @name dialog_success_fn
             * @desc Update list array on view
             */
            function dialog_success_fn(data, status, headers, config) {
                $rootScope.$broadcast('menu_list.add', {
                    item: data
                });
            }
        }

        /**
         * @name get_businesses
         * @desc Retrieve menu list
         * @memberOf app.menu.MenuOverviewCtrl
         */
        function get_businesses() {
            BusinessService.find().then(find_success_fn, find_error_fn);

            /**
             * @name find_success_fna
             * @desc Update list array on view
             */
            function find_success_fn(data, status, headers, config) {
                vm.businesses = data.data;
                select_initial_business();
            }

            /**
             * @name find_error_fn
             * @desc Show snackbar with error
             */
            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                NotificationService.give_error_feedback(MenusModel.feedback.get_businesses_fail);
            }
        }

        /**
         * @name select_initial_business
         * @desc Layout configuration
         * @memberOf app.menu.MenuOverviewCtrl
         */
        function select_initial_business() {
            if (vm.businesses.length) {
                vm.selected_business = vm.businesses[0];
            }
        }
    }
})();
