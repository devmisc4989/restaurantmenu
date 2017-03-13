/**
 * BookingService
 * @namespace app.booking.services
 */
(function () {
    'use strict';

    angular
        .module('app.booking.services')
        .service('BookingService', BookingService);

    BookingService.$inject = [
        '$http',
        '$q',
        '$localStorage',
        'NotificationService',
        '$rootScope',
        'RestFactory',
        'BookingsModel'
    ];

    function BookingService($http, $q, $localStorage, NotificationService, $rootScope, RestFactory, BookingsModel) {

        var model_name = 'booking';

        var Service = function () {
            RestFactory.apply(this, arguments)
        };

        var BookingService = new Service(model_name);

        return BookingService;
    }
})();