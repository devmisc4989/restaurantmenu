(function () {
    'use strict';

    angular
        .module('app.menu', [
            'app.menu.controllers',
            'app.menu.directives',
            'app.menu.services'
        ]);

    angular
        .module('app.menu.controllers', ['as.sortable']);

    angular
        .module('app.menu.directives', []);

    angular
        .module('app.menu.services', []);
})();