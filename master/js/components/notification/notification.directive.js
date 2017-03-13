/**
 * NotificationBar
 * @namespace app.notification.directives
 */
(function () {
    'use strict';

    angular
        .module('app.notification.directives')
        .directive('notificationBar', notificationBar);

    /**
     * @namespace NotificationBar
     */
    function notificationBar($timeout) {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.notification.directives
         */
        var directive = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                type: '=type',
                showbar: '=showbar',
                subnavbar: '=subnavbar',
                delay: '=delay'
            },
            templateUrl: '/app/views/partials/notification.html',
            controller: 'NotificationCtrl',
            controllerAs: 'vm',
            link: link
        };

        return directive;

        function link(scope, el, attrs, ctrl, transclude) {
            // Do not delete nested HTML elements inside directive tags
            el.find('.menucloud-notification-content').append(transclude());
        }
    }
})();