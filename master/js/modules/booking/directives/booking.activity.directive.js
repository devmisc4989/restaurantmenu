/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingActivityBox', bookingActivityBox);

    /**
     * @namespace Bookings
     */
    function bookingActivityBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingActivityBox
         */
        var directive = {
            controller: 'BookingActivityBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingComment: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.activity.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();