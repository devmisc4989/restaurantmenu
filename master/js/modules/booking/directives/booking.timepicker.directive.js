/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingTimePicker', bookingTimePicker);

    /**
     * @namespace Bookings
     */
    function bookingTimePicker() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingTimePicker
         */
        var directive = {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {
                var parent = $(element).parent();
                var initialDate = new Date($(element).val());
                var dtp = parent.datetimepicker({
                    inline: true,
                    sideBySide: true,
                    format: 'LT'
                });
                dtp.on("dp.change", function (e) {
                    ngModelCtrl.$setViewValue(moment(e.date).format('h:mm A'));
                    scope.$apply();
                });
            }
        };

        return directive;
    }

})();