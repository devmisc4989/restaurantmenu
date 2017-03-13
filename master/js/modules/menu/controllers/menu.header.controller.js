(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuHeaderCtrl', MenuHeaderCtrl);

    MenuHeaderCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuUtilsService',
        'MenuService',
        'MenusModel'
    ];

    function MenuHeaderCtrl($rootScope, $scope, MenuUtilsService, MenuService, MenusModel) {

        var vm = this;

        vm.select = select;

        vm.show_more = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuHeaderCtrl
         */
        function activate() {
            $scope.$on('menu_object.preselect', function (event, data) {
                vm.mark_selected = data.item == $scope.menuData;
                vm.show_more = data.item ? vm.show_more : false;
            });
        }

        /**
         * @name select
         * @desc Select current menu object and save it to menu model
         * @memberOf app.menu.MenuHeaderCtrl
         */
        function select(item, $event) {
            MenuUtilsService.select(item, $event);
        }
    }
})();
