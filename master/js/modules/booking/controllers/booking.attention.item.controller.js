(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingAttentionItemCtrl', BookingAttentionItemCtrl);

    BookingAttentionItemCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'BookingService',
        'BookingsModel'
    ];

    function BookingAttentionItemCtrl($rootScope, $scope, $mdDialog, BookingService, BookingsModel) {

        var vm = this;

        vm.destroy_booking = destroy_booking;
        vm.select_booking = select_booking;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingAttentionItemCtrl
         */
        function activate() {
        }

        /**
         * @name destroy_booking
         * @desc Retrieve booking list
         * @memberOf app.booking.BookingCtrl
         */
        function destroy_booking(item) {
            $rootScope.$broadcast('booking_list.destroy_booking', {
                item: item
            });
        }

        /**
         * @name select_booking
         * @desc Select current booking object and save it to booking model
         * @memberOf app.booking.BookingCtrl
         */
        function select_booking(item) {
            BookingsModel.selected_booking = item;
        }

    }
})();
