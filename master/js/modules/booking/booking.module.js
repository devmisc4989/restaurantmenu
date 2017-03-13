(function () {
    'use strict';

    angular
        .module('app.booking', [
            'app.booking.controllers',
            'app.booking.directives',
            'app.booking.services'
        ]);

    angular
        .module('app.booking.controllers', ['as.sortable']);

    angular
        .module('app.booking.directives', []);

    angular
        .module('app.booking.services', []);
})();