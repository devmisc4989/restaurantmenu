(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingStatusLineCtrl', BookingStatusLineCtrl);

    BookingStatusLineCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel'
    ];

    function BookingStatusLineCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel) {

        var vm = this;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingStatusLineCtrl
         */
        function activate() {
        }
    }
})();
