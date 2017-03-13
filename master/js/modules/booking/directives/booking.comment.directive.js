/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingCommentBox', bookingCommentBox);

    /**
     * @namespace Bookings
     */
    function bookingCommentBox() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingCommentBox
         */
        var directive = {
            controller: 'BookingCommentBoxCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                bookingComment: '='
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.comment.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();