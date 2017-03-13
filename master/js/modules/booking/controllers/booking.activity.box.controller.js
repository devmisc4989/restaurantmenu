(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingActivityBoxCtrl', BookingActivityBoxCtrl);

    BookingActivityBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessCommentService',
        'BookingService',
        'BusinessFeedbackService'
    ];

    function BookingActivityBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessCommentService,
                                   BookingService,
                                   BusinessFeedbackService) {

        var vm = this;

        vm.activities           = [];

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingActivityBoxCtrl
         */
        function activate() {
          get_activities();
          $scope.$on('booking_object.refresh', function (event, data) {
            get_activities();
          });
        }

        function get_activities(){
          vm.activities = BookingsModel.selected_booking.actions;
        }
    }
})();
