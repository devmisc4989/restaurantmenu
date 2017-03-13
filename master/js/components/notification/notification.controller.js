(function () {
    'use strict';

    angular
        .module('app.notification.controllers')
        .controller('NotificationCtrl', NotificationCtrl);

    NotificationCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'MenuService',
        'MenusModel'
    ];

    var SUBNAVBAR = 'with-sub-navbar';
    var SUCCESS = 'with-success-message';
    var ERROR = 'with-error-message';
    var WARNING = 'with-warning-message';
    var DELAY = 8000;

    var TYPES = {
        success: 'success',
        warning: 'warning',
        error: 'error'
    };

    function NotificationCtrl($rootScope, $scope, $timeout, MenuService, MenusModel) {

        var vm = this;

        vm.hide = hide;
        vm.classes = [];

        var timer = {};
        var notification = {
            type: '',
            subnavbar: ''
        };

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function activate() {
            vm.type = $scope.type;
            vm.subnavbar = $scope.subnavbar;
            vm.showbar = $scope.showbar;
            vm.delay = $scope.delay;

            if (!vm.delay) {
                vm.delay = DELAY;
            }

            update_subnavbar_classes(vm.subnavbar);
            update_type_classes(vm.type);

            $scope.$watch('showbar', function (newValue, oldValue) {
                if (newValue === true) {
                    hide_element();
                }
            }, true);

            $scope.$watch('subnavbar', function (newValue, oldValue) {
                update_subnavbar_classes(newValue);
            }, true);

            $scope.$watch('type', function (newValue, oldValue) {
                update_type_classes(newValue);
            }, true);

            function hide_element() {
                if (timer && typeof timer.then == 'function') {
                    $timeout.cancel(timer);
                }
                else {
                    timer = $timeout(function () {
                        $scope.showbar = false;
                        timer = null;
                    }, vm.delay);
                }
            }
        }

        /**
         * @name hide
         * @desc Hides the notifications bar
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function hide() {
            $scope.showbar = false;
        }

        /**
         * @name change_subnavbar_field
         * @desc Adjust notification bar to fit layout with subnavbar or without
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function change_subnavbar_field(subnavbar) {
            if (subnavbar) {
                notification.subnavbar = SUBNAVBAR;
            }
            else {
                notification.subnavbar = '';
            }
        }

        /**
         * @name change_type_field
         * @desc Changes notifications bar type to success, error or warning
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function change_type_field(type) {
            if (type == TYPES.success) {
                notification.type = SUCCESS;
            }
            else if (type == TYPES.warning) {
                notification.type = WARNING;
            }
            else if (type == TYPES.error) {
                notification.type = ERROR;
            }
        }

        /**
         * @name update_type_classes
         * @desc Updates notifications bar type classes
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function update_type_classes(type) {
            vm.classes = [];
            change_type_field(type);

            _.each(notification, function (item) {
                vm.classes.push(item);
            });
        }

        /**
         * @name update_subnavbar_classes
         * @desc Updates notifications bar subnavbar classes
         * @memberOf app.notification.controllers.NotificationCtrl
         */
        function update_subnavbar_classes(subnavbar) {
            vm.classes = [];
            change_subnavbar_field(subnavbar);

            _.each(notification, function (item) {
                vm.classes.push(item);
            });
        }
    }
})();
