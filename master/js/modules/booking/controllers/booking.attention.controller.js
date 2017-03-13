(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingAttentionCtrl', BookingAttentionCtrl);

    BookingAttentionCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'BookingService',
        'BookingsModel'
    ];

    function BookingAttentionCtrl($rootScope, $scope, $mdDialog, BookingService, BookingsModel) {

        var vm = this;

        vm.bookings_attention = [];
        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingAttentionCtrl
         */
        function activate() {
            $scope.$on('booking_list.booking_attention', function (event, data) {
                get_booking_attention(data);                
            });
        }

        function get_booking_attention(data){
            vm.bookings_attention = [];
            _.each(data.item, function (item) {
              if (item.has_reminder) {
                vm.bookings_attention.push(item);
              } else if (item.stage == "pending" && item.from_api) {
                vm.bookings_attention.push(item);
              } else if (item.stage == "proposal" || item.stage == "revision") {
                vm.bookings_attention.push(item);
              }
            });

           vm.bookings_attention.sort(function(a,b){
             return new Date(a.date) - new Date(b.date);
           }); 

        }                
    }
})();
