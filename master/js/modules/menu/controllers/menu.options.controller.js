(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuOptionsCtrl', MenuOptionsCtrl);

    MenuOptionsCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuElementsFactory',
        'MenuService',
        'MenusModel'
    ];

    function MenuOptionsCtrl($rootScope, $scope, MenuElementsFactory, MenuService, MenusModel) {

        var vm = this;

        vm.add_option = add_option;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuOptionsCtrl
         */
        function activate() {
            $scope.$on('menu_object.remove_option', function (event, data) {
                if ($scope.menuData.options == data.options) {
                    remove_option(data.option);
                }
            });
        }

        /**
         * @name remove_option
         * @memberOf app.menu.MenuOptionsCtrl
         */
        function remove_option(item) {
            $scope.menuData.options = _.reject($scope.menuData.options,
                function (item_) {
                    return item == item_;
                });
        }

        /**
         * @name add_option
         * @memberOf app.menu.MenuOptionsCtrl
         */
        function add_option(menuData) {
            var menu_elements_factory = new MenuElementsFactory();
            var new_option = menu_elements_factory.create_item(MenusModel.constants.OPTION);
            if(menuData.options) {
                menuData.options.push(new_option);
            }
            else {
                menuData.options = [];
                menuData.options.push(new_option);
            }
        }
    }
})();
