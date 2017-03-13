/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingDateBox', bookingDateBox);

    /**
     * @namespace Bookings
     */
    function bookingDateBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingDateBox
         */
        var directive = {
            controller: 'BookingDateBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingDate: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.date.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();