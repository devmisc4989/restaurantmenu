/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingAttention', bookingAttention);

    /**
     * @namespace Bookings
     */
    function bookingAttention() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingAttention
         */
        var directive = {
            controller: 'BookingAttentionCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/booking.attention.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();