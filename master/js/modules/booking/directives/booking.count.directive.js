/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingCountBox', bookingCountBox);

    /**
     * @namespace Bookings
     */
    function bookingCountBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingCountBox
         */
        var directive = {
            controller: 'BookingCountBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingCount: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.count.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();