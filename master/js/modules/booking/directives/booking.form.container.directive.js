/**
* bookingFormContainer
* @namespace app.booking.directives
*/
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingFormContainer', bookingFormContainer);

    /**
    * @namespace bookingFormContainer
    */
    function bookingFormContainer($compile) {

        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf app.booking.directives.Menu
        */
        var directive = {
            restrict: 'E',
            controller: 'BookingFormContainerCtrl',
            controllerAs: 'vm',
            scope:{},
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/form/form.container.html';
                }
            }
        };

        return directive;
    }

})();