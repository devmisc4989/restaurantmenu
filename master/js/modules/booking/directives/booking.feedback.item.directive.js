/**
* bookingFeedbackItem
* @namespace app.booking.directives
*/
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingFeedbackItem', bookingFeedbackItem);

    /**
    * @namespace bookingFeedbackItem
    */
    function bookingFeedbackItem($compile) {

        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf app.booking.directives.Menu
        */
        var directive = {
            restrict: 'E',
            scope: {
                item: '=feedback'
            },
            controller: 'BookingFeedbackItemCtrl',
            controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.feedback.item.html';
                }
            }
        };

        return directive;
    }

})();