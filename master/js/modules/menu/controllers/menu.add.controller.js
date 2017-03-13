(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuAddDialogCtrl', MenuAddDialogCtrl);

    MenuAddDialogCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        '$mdDialog',
        '$timeout',
        'NotificationService',
        'MenuService',
        'MenusModel'
    ];

    function MenuAddDialogCtrl($rootScope,
                               $scope,
                               $state,
                               $mdDialog,
                               $timeout,
                               NotificationService,
                               MenuService,
                               MenusModel) {

        var vm = this;

        vm.add_menu = add_menu;
        vm.cancel = cancel;
        vm.hide = hide;

        vm.menu = {
            title: '',
            description: ''
        };

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuAddDialogCtrl
         */
        function activate() {
        }

        /**
         * @name add_menu
         * @desc Creates new menu object
         * @memberOf app.menu.MenuAddDialogCtrl
         */
        function add_menu() {
            if (vm.dialogForm.$valid) {
                vm.disabled = true;
                vm.menu.business = MenusModel.current_business.id;
                MenuService.create(vm.menu).then(success_fn, error_fn);
            }

            function success_fn(data, status, headers, config) {
                $mdDialog.hide(data.data);
                vm.disabled = false;
                NotificationService.give_success_feedback(MenusModel.feedback.add_success);
                $timeout(function() {
                    MenusModel.selected_menu = data.data;
                    MenusModel.menus.push(data.data);
                    $state.go('app.menu-editor', { id: data.data.id });
                }, 1000);
            }

            function error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(MenusModel.feedback.add_fail);
                vm.disabled = false;
                console.log("err: ", data);
            }
        }

        /**
         * @name hide
         * @memberOf app.menu.MenuAddDialogCtrl
         */
        function hide() {
            $mdDialog.hide();
        }

        /**
         * @name cancel
         * @memberOf app.menu.MenuAddDialogCtrl
         */
        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
