/**
 * StatusCommand
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingStatusCommand', bookingStatusCommand);

    /**
     * @namespace StatusCommand
     */
    function bookingStatusCommand() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookings
         */
        var directive = {
            restrict: 'E',
            scope: {
                bookingData: '='
            },
            controller: 'BookingStatusCommandCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/booking/detail/booking.status.command.html'
        };

        return directive;
    }
})();