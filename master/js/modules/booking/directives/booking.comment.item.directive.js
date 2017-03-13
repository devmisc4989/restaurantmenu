/**
* bookingCommentItem
* @namespace app.booking.directives
*/
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingCommentItem', bookingCommentItem);

    /**
    * @namespace bookingCommentItem
    */
    function bookingCommentItem($compile) {

        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf app.booking.directives.Menu
        */
        var directive = {
            restrict: 'E',
            scope: {
                item: '=comment'
            },
            controller: 'BookingCommentItemCtrl',
            controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/detail/booking.comment.item.html';
                }
            }
        };

        return directive;
    }

})();