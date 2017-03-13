/**
 * ProductService
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .service('ProductService', ProductService);

    ProductService.$inject = [
        '$http',
        '$q',
        'ProductsModel',
        'NotificationService',
        '$rootScope',
        'RestFactory',
        'MenusModel'
    ];

    function ProductService($http, $q, ProductsModel, NotificationService, $rootScope, RestFactory, MenusModel) {

        var model_name = 'product';

        var Service = function () {
            RestFactory.apply(this, arguments)
        };

        var ProductService = new Service(model_name);

        ProductService.save = save;
        ProductService.delete_products = delete_products;
        ProductService.update_products = update_products;

        /**
         * @name save
         * @desc Saves products to db
         * @memberOf app.menu.ProductService
         */
        function save(menu, quiet) {
            var menu_object_denormalized = ProductService.denormalize(angular.copy(menu));

            return ProductService.update(menu_object_denormalized).then(find_success_fn, find_error_fn);

            function find_success_fn(data) {
                $rootScope.$broadcast('menu_object.changed', {
                    status: false
                });
                if (!quiet) {
                    NotificationService.give_success_feedback(MenusModel.feedback.save_success);
                }
            }

            function find_error_fn(data) {
                if (!quiet) {
                    NotificationService.give_error_feedback(MenusModel.feedback.save_fail);
                }
                console.log("err: ", data);
            }
        }

        /**
         * @name delete_products
         * @desc Delete all products that are bind to deleted items
         * @memberOf app.menu.ProductService
         */
        function delete_products() {
            var promises = [];

            _.each(ProductsModel.products_to_be_deleted, function (product_id) {
                promises.push(ProductService.destroy({id: product_id}));
            });

            return $q.all(promises).then(destroy_success_fn, destroy_error_fn);

            function destroy_success_fn(data, status, headers, config) {
                ProductsModel.products_to_be_deleted = [];
            }

            function destroy_error_fn(data, status, headers, config) {
            }
        }

        /**
         * @name update_products
         * @desc Updates all products that are bind to items which have been modified
         * @memberOf app.menu.ProductService
         */
        function update_products() {
            var promises = [];
            var product = {};

            _.each(MenusModel.modified_items, function (item) {
                product.id = item.product_id;
                product.description = item.description;
                promises.push(ProductService.update(product));
            });

            return $q.all(promises).then(update_success_fn, update_error_fn);

            function update_success_fn(data) {
                MenusModel.modified_items = [];
            }

            function update_error_fn(data) {
            }
        }

        return ProductService;
    }
})();