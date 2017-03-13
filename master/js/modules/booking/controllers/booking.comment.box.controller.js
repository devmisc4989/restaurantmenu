(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingCommentBoxCtrl', BookingCommentBoxCtrl);

    BookingCommentBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessCommentService',
        'BookingService',
        'BusinessFeedbackService'
    ];

    function BookingCommentBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessCommentService,
                                   BookingService,
                                   BusinessFeedbackService) {

        var vm = this;

        vm.selected_comment     = '';

        vm.add_comment          = add_comment;

        vm.comments             = [];
        vm.feedbacks            = [];

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingCommentBoxCtrl
         */
        function activate() {
          get_comments();
          get_feedbacks();

          $scope.$on('booking_object.refresh', function (event, data) {
            get_comments();
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

        function get_comments(){
          
          var action_url = '?booking=' + BookingsModel.selected_booking.id;

          BusinessCommentService.customAction('get', action_url, '').then(success_fn, error_fn);
          function success_fn(data, status, headers, config) {
            vm.comments = data.data;
          }

          function error_fn(data, status, headers, config) {
          }
        }

        function add_comment(){
          var action_url = 'sendComment/' + BookingsModel.selected_booking.id;
          var request = {comment: vm.selected_comment};
          BusinessCommentService.customAction('put', action_url, request).then(success_fn, error_fn);
          
          function success_fn(data, status, headers, config) {
            $rootScope.$broadcast('booking_object.changed');
            vm.selected_comment = '';
            NotificationService.give_success_feedback(BookingsModel.feedback.add_comment_success);
          }

          function error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.add_comment_fail);
          }
        }
    }
})();
