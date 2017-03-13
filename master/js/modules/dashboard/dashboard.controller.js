/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'SocketService'
    ];

    function DashboardCtrl($rootScope, $scope, $state, SocketService) {

        var vm = this;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.subtopnavbar.DashboardCtrl
         */
        function activate() {

            console.log('dashboard activate');

            configure_layout();
            SocketService.init();

            if (!$rootScope.user) $state.go("page.login");
            $rootScope.topnavbar.title = 'MENU OVERVIEW';
            $rootScope.app.layout.hasSubTopNavBar = false;
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.dashboard.DashboardCtrl
         */
        function configure_layout() {

            $rootScope.$broadcast('topnavbar.update', {
                title: 'DASHBOARD'
            });
        }
    }

})();
