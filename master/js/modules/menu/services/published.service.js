/**
 * PublishedService
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .service('PublishedService', PublishedService);

    PublishedService.$inject = [
        '$http',
        '$q',
        '$localStorage',
        'NotificationService',
        'MenusModel',
        'RestFactory',
        'MenuService'
    ];

    function PublishedService($http, $q, $localStorage, NotificationService, MenusModel, RestFactory, MenuService) {

        var model_name = 'Published';

        var Service = function () {
            RestFactory.apply(this, arguments)
        };

        var PublishedService = new Service(model_name);

        PublishedService.unpublish = unpublish;
        PublishedService.publish = publish;
        PublishedService.update_published = update_published;
        PublishedService.update_published_document = update_published_document;

        /**
         * @name publish
         * @desc Unpublishes currently selected Menu Object
         * @memberOf app.menu.PublishedService
         */
        function unpublish(menu) {
            var published = MenusModel.published;

            menu.is_published = false;

            var index = _.findIndex(published.menus, function (item) {
                return item.id == menu.id;
            });

            if (index != -1) {
                published.menus.splice(index, 1);
            }

            var promises = [MenuService.save(menu, true), PublishedService.update_published_document(published)];
            return $q.all(promises).then(success_fn, error_fn);

            function success_fn(data) {
                NotificationService.give_success_feedback(MenusModel.feedback.unpublish_success);
            }

            function error_fn(data) {
                NotificationService.give_error_feedback(MenusModel.feedback.unpublish_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name publish
         * @desc Publishes currently selected Menu Object
         * @memberOf app.menu.PublishedService
         */
        function publish(menu) {
            var published = MenusModel.published;

            menu.is_published = true;

            var index = _.findIndex(published.menus, function (item) {
                return item.id == menu.id;
            });

            if (index == -1) {
                published.menus.push(menu);
            }
            else {
                published.menus[index] = menu;
            }

            var promises = [MenuService.save(menu, true), PublishedService.update_published_document(published)];
            return $q.all(promises).then(success_fn, error_fn);

            function success_fn(data) {
                NotificationService.give_success_feedback(MenusModel.feedback.publish_success);
            }

            function error_fn(data) {
                NotificationService.give_error_feedback(MenusModel.feedback.publish_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name update_published
         * @desc Updates currently selected Menu Object
         * @memberOf app.menu.PublishedService
         */
        function update_published(menu) {
            var published = MenusModel.published;

            menu.is_published = true;

            var index = _.findIndex(published.menus, function (item) {
                return item.id == menu.id;
            });

            if (index == -1) {
                published.menus.push(menu);
            }
            else {
                published.menus[index] = menu;
            }

            var promises = [MenuService.save(menu, true), PublishedService.update_published_document(published)];
            return $q.all(promises).then(success_fn, error_fn);

            function success_fn(data) {
                NotificationService.give_success_feedback(MenusModel.feedback.update_success);
            }

            function error_fn(data) {
                NotificationService.give_error_feedback(MenusModel.feedback.update_fail);
                console.log("err: ", data);
            }
        }

        /**
         * @name update_published_document
         * @desc Updates Published Model
         * @memberOf app.menu.PublishedService
         */
        function update_published_document(published) {
            published = angular.copy(published);
            published.menus = MenuService.denormalize_all(published.menus);

            var new_published = {
                id: published.id,
                menus: published.menus
            };
            return PublishedService.update(new_published);
        }

        return PublishedService;
    }
})();