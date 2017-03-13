/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingTimeBox', bookingTimeBox);

    /**
     * @namespace Bookings
     */
    function bookingTimeBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingTimeBox
         */
        var directive = {
            controller: 'BookingTimeBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingTime: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.time.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();