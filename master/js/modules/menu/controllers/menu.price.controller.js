(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuPriceCtrl', MenuPriceCtrl);

    MenuPriceCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'MenuService',
        'MenusModel'
    ];

    function MenuPriceCtrl($rootScope, $scope, $timeout, MenuService, MenusModel) {

        var vm = this;

        vm.remove_label = remove_label;
        vm.add_price = add_price;
        vm.remove_price = remove_price;
        vm.hide_close_btn = hide_close_btn;
        vm.show_label_close_btn = show_label_close_btn;

        vm.show_description_input = false;
        vm.show_add_btn = false;
        vm.label_focused = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuPriceCtrl
         */
        function activate() {
        }

        /**
         * @name remove_price
         * @memberOf app.menu.MenuPriceCtrl
         */
        function remove_price(price, menuData) {
            if (menuData.prices.length == 1) {
                add_price(menuData);
            }
            $rootScope.$broadcast('menu_object.remove_price', {
                price: price,
                prices: menuData.prices
            });
        }

        /**
         * @name hide_close_btn
         * @memberOf app.menu.MenuPriceCtrl
         */
        function hide_close_btn() {
            $timeout(function () {
                vm.show_close_btn = false
            }, 300);
        }

        /**
         * @name hide_close_btn
         * @memberOf app.menu.MenuPriceCtrl
         */
        function show_label_close_btn(menuData) {
            return vm.label_focused && (menuData.description || vm.show_description_input);
        }

        /**
         * @name add_price
         * @memberOf app.menu.MenuPriceCtrl
         */
        function add_price(menuData) {
            $rootScope.$broadcast('menu_object.add_price', {
                prices: menuData.prices
            });
        }

        /**
         * @name remove_labe
         * @memberOf app.menu.MenuPriceCtrl
         */
        function remove_label(item) {
            item.description = "";
            vm.show_description_input = false;
        }
    }
})();
