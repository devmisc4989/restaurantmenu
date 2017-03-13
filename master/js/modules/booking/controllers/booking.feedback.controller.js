(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingFeedbackBoxCtrl', BookingFeedbackBoxCtrl);

    BookingFeedbackBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BookingService',
        'BusinessFeedbackService'
    ];

    function BookingFeedbackBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BookingService,
                                   BusinessFeedbackService) {

        var vm = this;

        vm.feedbacks            = [];

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingFeedbackBoxCtrl
         */
        function activate() {
          get_feedbacks();

          $scope.$on('booking_object.refresh', function (event, data) {
            get_feedbacks();
          });
        }

        function get_feedbacks(){
          var action_url = '?booking=' + BookingsModel.selected_booking.id;

          BusinessFeedbackService.customAction('get', action_url, '').then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            vm.feedbacks = data.data;
          }

          function error_fn(data, status, headers, config) {
          }
        }
    }
})();
