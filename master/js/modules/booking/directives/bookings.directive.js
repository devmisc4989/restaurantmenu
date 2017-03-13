/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookings', bookings);

    /**
     * @namespace Bookings
     */
    function bookings() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookings
         */
        var directive = {
            controller: 'BookingsCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/bookings.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();