/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingGuestBox', bookingGuestBox);

    /**
     * @namespace Bookings
     */
    function bookingGuestBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingGuestBox
         */
        var directive = {
            controller: 'BookingGuestBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingGuest: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.guest.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();