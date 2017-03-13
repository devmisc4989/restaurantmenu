(function () {
    'use strict';

    angular
        .module('app.topnavbar')
        .controller('TopNavBarCtrl', TopNavBarCtrl);

    TopNavBarCtrl.$inject = [
        '$scope'
    ];

    function TopNavBarCtrl($scope) {

        var vm = this;

        vm.title = 'menuCLOUD';

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.TopNavBarCtrl
         */
        function activate() {

            $scope.$on('topnavbar.update', function (event, data) {
                vm.title = data.title;
            });
        }
    }
})();
