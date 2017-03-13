(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingCommentItemCtrl', BookingCommentItemCtrl);

    BookingCommentItemCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService'
    ];

    function BookingCommentItemCtrl($rootScope,
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
         * @memberOf app.booking.BookingCommentItemCtrl
         */
        function activate() {
        }

        function formatDate(date){
          return moment(date).format('MMMM D YYYY');          
        }
    }
})();
