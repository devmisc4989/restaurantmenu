(function () {
    'use strict';

    angular
        .module('app.booking')
        .config(Config);

    Config.$inject = [
        '$stateProvider',
        'RouteHelpersProvider'
    ];

    function Config(
        $stateProvider,
        helper) {

        $stateProvider
            .state('app.booking', {
                url: '/booking',
                title: 'BOOKING OVERVIEW',
                controller: "BookingOverviewCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('booking/booking_overview.html')
            })
            .state('app.booking-detail', {
                url: '/booking/detail',
                title: 'BOOKING DETAIL',
                controller: "BookingDetailCtrl",
                controllerAs: "vm",
                templateUrl: helper.basepath('booking/detail/booking.detail.html')
            })
    }
})();