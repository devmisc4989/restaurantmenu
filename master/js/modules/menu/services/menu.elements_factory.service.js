/**
 * MenuElementsFactory
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('MenuElementsFactory', MenuElementsFactory);

    MenuElementsFactory.$inject = ['MenusModel'];

    /**
     * @namespace MenuElementsFactory
     * @returns {MenuElementsFactory}
     */
    function MenuElementsFactory(MenusModel) {

        /**
         * Constructor, with class name
         */
        function MenuElementsFactory() {
        }

        /**
         * Public methods, assigned to prototype
         */
        MenuElementsFactory.prototype.create_item = function (type) {
            if(type == MenusModel.constants.PRICE) {
                return new Price();
            }
            else if(type == MenusModel.constants.OPTION) {
                return new Option();
            }
            else if(type == MenusModel.constants.SELECTION) {
                return new Selection();
            }
        };

        /**
         * Private properties
         */
        var Price = function () {
            this.amount = "";
            this.description = "";
        };

        var Option = function () {
            this.amount = "";
            this.description = "";
            this.type = "";
            this.selection = [];
        };

        var Selection = function () {
            this.amount = "";
            this.description = "";
        };

        /**
         * Return the constructor function
         */

        return MenuElementsFactory;
    }
})();