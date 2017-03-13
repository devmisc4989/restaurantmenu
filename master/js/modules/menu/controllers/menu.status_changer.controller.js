(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuStatusChangerCtrl', MenuStatusChangerCtrl);

    MenuStatusChangerCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuUtilsService',
        'NotificationService',
        'MenusModel'
    ];

    function MenuStatusChangerCtrl($rootScope,
                                   $scope,
                                   MenuUtilsService,
                                   NotificationService,
                                   MenusModel) {

        var vm = this;

        vm.publish = publish;
        vm.unpublish = unpublish;
        vm.update = update;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuStatusChangerCtrl
         */
        function activate() {
        }

        /**
         * @name publish
         * @desc publish Menu Object
         * @memberOf app.menu.MenuStatusChangerCtrl
         */
        function publish(menuData) {
            $rootScope.$broadcast('menu_object.publish');
        }

        /**
         * @name unpublish
         * @desc removes Menu Object from publish document
         * @memberOf app.menu.MenuStatusChangerCtrl
         */
        function unpublish(menuData) {
            $rootScope.$broadcast('menu_object.unpublish');
        }

        /**
         * @name update
         * @desc updated Menu Objects
         * @memberOf app.menu.MenuStatusChangerCtrl
         */
        function update(item) {
            $rootScope.$broadcast('menu_object.update');
        }

        /**
         * @name save
         * @memberOf app.menu.MenuStatusChangerCtrl
         */
        function save() {
            $rootScope.$broadcast('menu_object.save');
        }
    }
})();
