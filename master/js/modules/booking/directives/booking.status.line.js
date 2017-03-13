/**
 * StatusLine
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingStatusLine', bookingStatusLine);

    /**
     * @namespace StatusLine
     */
    function bookingStatusLine() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookings
         */
        var directive = {
            restrict: 'E',
            scope: {
                statusData: '=',
                flowData: '=',
            },
            controller: 'BookingStatusLineCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/booking/detail/booking.status.line.html'
        };

        return directive;
    }
})();