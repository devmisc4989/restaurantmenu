/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingNoteBox', bookingNoteBox);

    /**
     * @namespace Bookings
     */
    function bookingNoteBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingNoteBox
         */
        var directive = {
            controller: 'BookingNoteBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingCount: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.note.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();