/**
 * GenericItemsFactory
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('GenericItemsFactory', GenericItemsFactory);

    GenericItemsFactory.$inject = ['MenusModel', 'MenuElementsFactory'];

    /**
     * @namespace GenericItemsFactory
     * @returns {GenericItemsFactory}
     */
    function GenericItemsFactory(MenusModel, MenuElementsFactory) {

        /**
         * Constructor, with class name
         */
        function GenericItemsFactory() {
        }

        /**
         * Public methods, assigned to prototype
         */
        GenericItemsFactory.prototype.create_item = function (type) {
            if (type == MenusModel.constants.CATEGORY) {
                return new Category();
            }
            else if (type == MenusModel.constants.SUBCATEGORY) {
                return new Subcategory();
            }
            else if (type == MenusModel.constants.ITEM) {
                return new Item();
            }
            else if (type == MenusModel.constants.NOTE) {
                return new Note();
            }
            else if (type == MenusModel.constants.FIXED_PRICE_ITEM) {
                return new Fixed_Price_Item();
            }
        };

        /**
         * Private properties
         */
        var Category = function () {
            this.type = "group";
            this.name = "";
            this.description = "";
            this.items = [];
            this.prices = [];
            this.options = [];

            var price = menu_elements_factory.create_item(MenusModel.constants.PRICE);
            var option = menu_elements_factory.create_item(MenusModel.constants.OPTION);
            this.prices.push(price);
            this.options.push(option);
        };

        var Subcategory = function () {
            this.type = "item_group";
            this.name = "";
            this.description = "";
            this.items = [];
            this.options = [];
            this.prices = [];

            var price = menu_elements_factory.create_item(MenusModel.constants.PRICE);
            var option = menu_elements_factory.create_item(MenusModel.constants.OPTION);
            this.prices.push(price);
            this.options.push(option);
        };

        var Item = function () {
            this.type = "item";
            this.product_id = "";
            this.title = "";
            this.description = "";
            this.prices = [];
            this.options = [];

            var price = menu_elements_factory.create_item(MenusModel.constants.PRICE);
            var option = menu_elements_factory.create_item(MenusModel.constants.OPTION);
            this.prices.push(price);
            this.options.push(option);
        };

        var Fixed_Price_Item = function () {
            this.type = "fixedPrice";
            this.values = [{type: 'description', value: ''}, {type: 'price', value: ''}];
        };

        var Note = function () {
            this.type = "note";
            this.note = "";
        };

        var menu_elements_factory = new MenuElementsFactory();

        /**
         * Return the constructor function
         */

        return GenericItemsFactory;
    }
})();