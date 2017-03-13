/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingFeedbackBox', bookingFeedbackBox);

    /**
     * @namespace Bookings
     */
    function bookingFeedbackBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingFeedbackBox
         */
        var directive = {
            controller: 'BookingFeedbackBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingFeedback: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.feedback.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();