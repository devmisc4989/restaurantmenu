(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuCtrl', MenuCtrl);

    MenuCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'MenuService',
        'MenusModel'
    ];

    function MenuCtrl($rootScope, $scope, $mdDialog, MenuService, MenusModel) {

        var vm = this;

        vm.destroy_menu = destroy_menu;
        vm.select_menu = select_menu;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuCtrl
         */
        function activate() {
            vm.type = $scope.type;
        }

        /**
         * @name destroy_menu
         * @desc Retrieve menu list
         * @memberOf app.menu.MenuCtrl
         */
        function destroy_menu(item, type) {
            $rootScope.$broadcast('menu_list.destroy_menu', {
                item: item,
                type: type
            });
        }

        /**
         * @name select_menu
         * @desc Select current menu object and save it to menu model
         * @memberOf app.menu.MenuCtrl
         */
        function select_menu(item) {
            MenusModel.selected_menu = item;
        }
    }
})();
