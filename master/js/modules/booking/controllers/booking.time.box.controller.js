(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingTimeBoxCtrl', BookingTimeBoxCtrl);

    BookingTimeBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingTimeBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService) {

        var vm = this;

        vm.selected_time        = new Date();

        vm.update_time          = update_time;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingTimeBoxCtrl
         */
        function activate() {
          vm.selected_time = moment(BookingsModel.selected_booking.date).format('h:mm A');
        }

        function update_time(){
          var current_date = moment(BookingsModel.selected_booking.date);
          var new_date = vm.selected_time;

          new_date = new_date.replace(" ", ':').split(":");

          if (new_date[2] == "PM") {
            new_date[0] = parseInt(new_date[0]) + 12;
          }

          var date = new Date(current_date.year(), current_date.month(), current_date.date(), parseInt(new_date[0]), parseInt(new_date[1]), 0);
          date = date.toISOString();

          var action_url = BookingsModel.selected_booking.id;
          var request = {date: date};
          BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            NotificationService.give_success_feedback(BookingsModel.feedback.update_time_success);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.update_time_fail);
          }
        }
    }
})();
