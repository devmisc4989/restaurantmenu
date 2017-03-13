(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingDateBoxCtrl', BookingDateBoxCtrl);

    BookingDateBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingDateBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService) {

        var vm = this;

        vm.selected_date        = new Date();

        vm.update_date          = update_date;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingDateBoxCtrl
         */
        function activate() {
          vm.selected_date = moment(BookingsModel.selected_booking.date).format('MMMM D YYYY');
        }

        function update_date(){
          var current_date = moment(BookingsModel.selected_booking.date);
          var new_date = moment(vm.selected_date, 'MMMM D YYYY');

          var date = new Date(new_date.year(), new_date.month(), new_date.date(), current_date.hour(), current_date.minute(), 0);
          date = date.toISOString();

          var action_url = BookingsModel.selected_booking.id;
          var request = {date: date};
          BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            NotificationService.give_success_feedback(BookingsModel.feedback.update_date_success);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.update_date_fail);
          }
        }
    }
})();
