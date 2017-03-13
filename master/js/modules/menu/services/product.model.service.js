/**
 * ProductsModel
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('ProductsModel', ProductsModel);

    ProductsModel.$inject = [];

    /**
     * @namespace ProductsModel
     * @returns {Factory}
     */
    function ProductsModel() {

        var ProductsModel = {
            LIMIT:25,
            feedback: {
                create_success: 'Product has been created successfully',
                update_success: 'Menu has been updated successfully',
                create_fail: 'Product has not been created, please check your internet connection',
                destroy_success: 'Item and product related to removed item will be permanently deleted when you save this menu',
                destroy_fail: 'One or more products related to removed items have not been deleted. Please contact site administrator',
                update_fail: 'One or more products related to updated items have not been updated. Please contact site administrator'
            },
            products_to_be_deleted: []
        };

        return ProductsModel;
    }
})();