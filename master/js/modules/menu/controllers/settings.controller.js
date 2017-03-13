(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = [
        '$scope',
        '$window',
        'MenuService',
        'MenusModel'
    ];

    function SettingsCtrl($scope,
                        $window,
                        MenuService,
                        MenusModel) {

        var vm = this;

        vm.save = save;
        vm.menu_object = {};
        vm.menu_object_raw = {};
        vm.selected_menu = {};

        var menu_object_changed = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.SettingsCtrl
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

            get_menu_object_data(query);

            initialize_leave_protection();
        }

        /**
         * @name are_you_sure_prompt
         * @desc Displays prompt asking if user wants to leave the page
         * @memberOf app.menu.SettingsCtrl
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
             * @memberOf app.menu.SettingsCtrl
             */
            function are_you_sure_prompt(message) {
                var answer = confirm(message);
                if (!answer) {
                    event.preventDefault();
                }
            }
        }

        /**
         * @name save
         * @desc Saves menu object
         * @memberOf app.menu.SettingsCtrl
         */
        function save() {
            return MenuService.save(vm.menu_object, false);
        }

        /**
         * @name get_menu_object_data
         * @desc Retrieve menu list
         * @memberOf app.menu.SettingsCtrl
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
