(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingNoteBoxCtrl', BookingNoteBoxCtrl);

    BookingNoteBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingNoteBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService) {

        var vm = this;

        vm.selected_note        = '';

        vm.update_note          = update_note;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingNoteBoxCtrl
         */
        function activate() {
          vm.selected_note = BookingsModel.selected_booking.notes;
        }

        function update_note(){

          var action_url = BookingsModel.selected_booking.id;
          var request = {notes: vm.selected_note};
          BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            NotificationService.give_success_feedback(BookingsModel.feedback.update_note_success);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.update_note_fail);
          }
        }
    }
})();
