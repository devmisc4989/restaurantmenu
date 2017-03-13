/**
* bookingActivityItem
* @namespace app.booking.directives
*/
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingActivityItem', bookingActivityItem);

    /**
    * @namespace bookingActivityItem
    */
    function bookingActivityItem($compile) {

        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf app.booking.directives.Menu
        */
        var directive = {
            restrict: 'E',
            scope: {
                item: '=activity'
            },
            controller: 'BookingActivityItemCtrl',
            controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.activity.item.html';
                }
            }
        };

        return directive;
    }

})();