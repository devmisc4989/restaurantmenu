/**
 * NotificationModel
 * @namespace app.notification.services
 */
(function () {
    'use strict';

    angular
        .module('app.notification.services')
        .factory('NotificationModel', NotificationModel);

    NotificationModel.$inject = [];

    /**
     * @namespace NotificationModel
     * @returns {Factory}
     */
    function NotificationModel() {

        var NotificationModel = {
            subnavbar: false
        };

        return NotificationModel;
    }
})();