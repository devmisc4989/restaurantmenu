(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuPricesCtrl', MenuPricesCtrl);

    MenuPricesCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuElementsFactory',
        'MenuService',
        'MenusModel'
    ];

    function MenuPricesCtrl($rootScope, $scope, MenuElementsFactory, MenuService, MenusModel) {

        var vm = this;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuPricesCtrl
         */
        function activate() {

            $scope.$on('menu_object.add_price', function (event, data) {
                if ($scope.menuData.prices == data.prices) {
                    add_price(data.prices);
                }
            });

            $scope.$on('menu_object.remove_price', function (event, data) {
                if ($scope.menuData.prices == data.prices) {
                    remove_price(data.price);
                }
            });
        }

        /**
         * @name remove_price
         * @memberOf app.menu.MenuPricesCtrl
         */
        function remove_price(item) {
            $scope.menuData.prices = _.reject($scope.menuData.prices,
                function (item_) {
                    return item == item_;
                });
        }

        /**
         * @name add_price
         * @memberOf app.menu.MenuPricesCtrl
         */
        function add_price(prices) {
            var menu_elements_factory = new MenuElementsFactory();
            var new_price = menu_elements_factory.create_item(MenusModel.constants.PRICE);
            prices.push(new_price);
        }
    }
})();
