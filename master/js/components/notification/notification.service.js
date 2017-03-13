/**
 * NotificationService
 * @namespace app.notification.services
 */
(function () {
    'use strict';

    angular
        .module('app.notification.services')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['$rootScope', 'NotificationModel'];

    /**
     * @namespace NotificationService
     * @returns {NotificationService}
     */
    function NotificationService($rootScope, NotificationModel) {
        var NotificationService = {
            give_success_feedback: give_success_feedback,
            give_error_feedback: give_error_feedback,
            give_warning_feedback: give_warning_feedback,
            configure: configure
        };

        return NotificationService;

        ////////////////////

        /**
         * @name give_success_feedback
         * @desc Displays success message in the notification bar
         * @memberOf app.notification.services
         */
        function give_success_feedback(message) {
            $rootScope.$broadcast('notification_bar.update', {
                message: message,
                show: true,
                type: 'success'
            });
        }

        /**
         * @name give_error_feedback
         * @desc Displays error message in the notification bar
         * @memberOf app.notification.services
         */
        function give_error_feedback(message) {
            $rootScope.$broadcast('notification_bar.update', {
                message: message,
                show: true,
                type: 'error'
            });
        }

        /**
         * @name give_warning_feedback
         * @desc Displays warning message in the notification bar
         * @memberOf app.notification.services
         */
        function give_warning_feedback(message) {
            $rootScope.$broadcast('notification_bar.update', {
                message: message,
                show: true,
                type: 'warning'
            });
        }

        /**
         * @name configure
         * @desc Configures the notification bar
         * @memberOf app.notification.services
         */
        function configure(params) {
            NotificationModel.subnavbar = params.subnavbar;
            $rootScope.$broadcast('notification_bar.update', {
                subnavbar: params.subnavbar
            });
        }
    }
})();