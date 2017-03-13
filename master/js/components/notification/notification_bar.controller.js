(function () {
    'use strict';

    angular
        .module('app.notification.controllers')
        .controller('NotificationBarCtrl', NotificationBarCtrl);

    NotificationBarCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationModel'
    ];


    function NotificationBarCtrl($rootScope, $scope, NotificationModel) {

        var vm = this;

        vm.notification = {
            message: '',
            show: false,
            type: '',
            subnavbar: ''
        };

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.notification.controllers.NotificationBarCtrl
         */
        function activate() {
            $scope.$on('notification_bar.update', function (event, data) {
                vm.notification.message = data.message ? data.message : vm.notification.message;
                vm.notification.show = data.show ? data.show : vm.notification.show;
                vm.notification.type = data.type ? data.type : vm.notification.type;
                vm.notification.subnavbar =
                    (data.subnavbar !== undefined)
                        ? data.subnavbar : (NotificationModel.subnavbar !== undefined
                        ? NotificationModel.subnavbar : vm.notification.subnavbar);
            });
        }
    }
})();
