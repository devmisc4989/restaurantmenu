(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingStatsCtrl', BookingStatsCtrl);

    BookingStatsCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'BookingService',
        'BookingsModel'
    ];

    function BookingStatsCtrl($rootScope, $scope, $mdDialog, BookingService, BookingsModel) {

        var vm = this;

        vm.stats = {
            incoming: 0,
            proposals: 0,
            tentatives: 0,
            confirmed: 0
        };

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingStatsCtrl
         */
        function activate() {
            $scope.$on('booking_list.update_stats', function (event, data) {
                update_booking_stat(data);                
            });
        }

        function update_booking_stat(data){
            vm.stats = {
                incoming: 0,
                proposals: 0,
                tentatives: 0,
                confirmed: 0
            };
            _.each(data.item, function (item) {
                if (item.has_reminder) {
                  //bookings_attention.push(item);
                  if (item.stage == "pending") {
                    vm.stats.incoming++;
                  } else if (item.stage == "proposal" || item.stage == "revision"){
                    vm.stats.proposals++;
                  } else if (item.stage == "confirmed") {
                    vm.stats.confirmed++;
                  }
                } else if (item.stage == "pending" && item.from_api) {
                  vm.stats.incoming++;
                  //bookings_attention.push(item);
                } else if (item.stage == "proposal" || item.stage == "revision") {
                  vm.stats.proposals++;
                  //bookings_attention.push(item);
                } else if (item.stage == "tentative") {
                  vm.stats.tentatives++;
                } else if (item.stage == "confirmed" || item.stage == "feedback") {
                  vm.stats.confirmed++;
                }
            });
        }        
    }
})();
