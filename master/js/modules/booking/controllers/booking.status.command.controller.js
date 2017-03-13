(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingStatusCommandCtrl', BookingStatusCommandCtrl);

    BookingStatusCommandCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$window',
        'NotificationService',
        'BookingsModel',
        'BookingService'
    ];

    function BookingStatusCommandCtrl($rootScope,
                                   $scope,
                                   $window,
                                   NotificationService,
                                   BookingsModel,
                                   BookingService) {

        var vm = this;

        vm.accept            = accept;
        vm.decline           = decline;
        vm.print             = print;
        vm.close             = close;
        vm.resendFeedback    = resendFeedback;
        vm.sendProposal      = sendProposal;
        vm.followupTentative = followupTentative;
        vm.followupFeedback  = followupFeedback;
        vm.proposal          = proposal;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingStatusCommandCtrl
         */
        function activate() {
          vm.selected_booking = BookingsModel.selected_booking;
          $scope.$on('booking_object.refresh', function (event, data) {
            vm.selected_booking = BookingsModel.selected_booking;
          });
        }

        function booking_action(action){
          var action_url = BookingsModel.selected_booking.id + '/' + action;

          BookingService.customAction('post', action_url, '').then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            $rootScope.$broadcast('booking_object.changed');
            NotificationService.give_success_feedback(BookingsModel.feedback[action + '_success']);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_success_feedback(BookingsModel.feedback[action + '_fail']);
          } 
        }
        /**
         * @name accept
         * @desc accept Booking Object
         * @memberOf app.booking.BookingStatusCommandCtrl
         */
        function accept() {
          booking_action('confirm');
        }

        /**
         * @name decline
         * @desc Decline Booking Object from pending
         * @memberOf app.booking.BookingStatusCommandCtrl
         */
        function decline() {
          booking_action('decline');
        }


        function print() {
            $window.open( apiEndPoint + '/booking/' + BookingsModel.selected_booking.id + '/print' );
        }

        function close() {
            booking_action('close');
        }

        function resendFeedback() {
        }

        function sendProposal() {
            booking_action('sendproposal');
        }

        function followupTentative() {
            booking_action('followuptentative');
        }       

        function followupFeedback() {
            booking_action('followupfeedback');
        }

        function proposal() {
            booking_action('accept');
        }
    }
})();
