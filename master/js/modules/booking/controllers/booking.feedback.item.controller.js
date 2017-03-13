(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingFeedbackItemCtrl', BookingFeedbackItemCtrl);

    BookingFeedbackItemCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingFeedbackItemCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService) {

        var vm = this;        
        vm.formatDate = formatDate;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingFeedbackItemCtrl
         */
        function activate() {
        }

        function formatDate(date){
          return moment(date).format('MMMM D YYYY');          
        }
    }
})();
