(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingCountBoxCtrl', BookingCountBoxCtrl);

    BookingCountBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingCountBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService) {

        var vm = this;

        vm.selected_count        = '';

        vm.update_count          = update_count;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingCountBoxCtrl
         */
        function activate() {
          vm.selected_count = BookingsModel.selected_booking.number_of_guests;
        }

        function update_count(){

          var action_url = BookingsModel.selected_booking.id;
          var request = {number_of_guests: vm.selected_count};
          BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            NotificationService.give_success_feedback(BookingsModel.feedback.update_count_success);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.update_count_fail);
          }
        }
    }
})();
