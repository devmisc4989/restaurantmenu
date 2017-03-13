/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingStats', bookingStats);

    /**
     * @namespace Bookings
     */
    function bookingStats() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingStats
         */
        var directive = {
            controller: 'BookingStatsCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/booking.stats.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();