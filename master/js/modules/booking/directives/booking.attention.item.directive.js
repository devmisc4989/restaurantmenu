/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingAttentionItem', bookingAttentionItem);

    /**
     * @namespace Bookings
     */
    function bookingAttentionItem() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingAttentionItem
         */
        var directive = {
            controller: 'BookingAttentionItemCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                item: '=booking'
            },
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/booking.attention.item.html';
                }
            },
            template: '<div ng-include="getContentUrl()"></div>'
        };

        return directive;
    }

})();