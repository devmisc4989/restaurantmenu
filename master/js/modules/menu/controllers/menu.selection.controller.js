(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuSelectionCtrl', MenuSelectionCtrl);

    MenuSelectionCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'MenuService',
        'MenusModel'
    ];

    function MenuSelectionCtrl($rootScope, $scope, $mdDialog, MenuService, MenusModel) {

        var vm = this;

        vm.remove_selection = remove_selection;
        vm.clear_price = clear_price;

        vm.show_remove_btn = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuSelectionCtrl
         */
        function activate() {
        }


        /**
         * @name remove_selection
         * @memberOf app.menu.MenuSelectionCtrl
         */
        function remove_selection(selection, menuData) {
            $rootScope.$broadcast('menu_object.remove_selection', {
                selection: selection,
                selections: menuData.selection
            });
        }

        /**
         * @name clear_price
         * @memberOf app.menu.MenuSelectionCtrl
         */
        function clear_price(item) {
            item.amount = "";
        }
    }
})();
