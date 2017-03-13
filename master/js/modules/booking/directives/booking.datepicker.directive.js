/**
 * Bookings
 * @namespace app.booking.directives
 */
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingDatePicker', bookingDatePicker);

    /**
     * @namespace Bookings
     */
    function bookingDatePicker() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.booking.directives.bookingDatePicker
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
                    format: 'MMMM D YYYY'
                });
                dtp.on("dp.change", function (e) {
                    ngModelCtrl.$setViewValue(moment(e.date).format('MMMM D YYYY'));
                    scope.$apply();
                });
            }
        };

        return directive;
    }

})();