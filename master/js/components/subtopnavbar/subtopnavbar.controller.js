/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.subtopnavbar')
        .controller('SubtopnavbarCtrl', SubtopnavbarCtrl);

    SubtopnavbarCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state'
    ];

    function SubtopnavbarCtrl($rootScope, $scope, $state) {

        var vm = this;

        vm.go_back_link = 'app.dashboard';

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.subtopnavbar.SubtopnavbarCtrl
         */
        function activate() {

            $rootScope.topnavbar.title = 'FIRST RESTAURANT';
            $rootScope.subtopnavbar.tabId = 0;
            $rootScope.subtopnavbar.navBack = {
                uri: 'app.dashboard'
            };

            vm.go_back_link = get_link_url();

            $scope.$on('subtopnavbar.update', function (event, data) {
                vm.go_back_link = get_link_url(data.uri);
            });

            $scope.onSelectTab = function (idx) {
                $rootScope.subtopnavbar.tabId = idx;
                console.log('selected tab idx: ', $rootScope.subtopnavbar.tabId);
            }
        }

        /**
         * @name get_link_url
         * @memberOf app.subtopnavbar.SubtopnavbarCtrl
         */
        function get_link_url(uri) {
              return uri ? $state.href(uri) : $state.href($rootScope.subtopnavbar.navBack.uri);
        }

    }

})();
