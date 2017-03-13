(function () {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuCategoryCtrl', MenuCategoryCtrl);

    MenuCategoryCtrl.$inject = [
        '$rootScope',
        '$scope',
        'MenuUtilsService',
        'MenuService',
        'MenusModel'
    ];

    function MenuCategoryCtrl($rootScope, $scope, MenuUtilsService, MenuService, MenusModel) {

        var vm = this;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.menu.MenuCategoryCtrl
         */
        function activate() {
            /**
             * @name sort_options
             * @desc Please checkout the docs: https://github.com/a5hik/ng-sortable
             * @memberOf app.menu.MenuCategoryCtrl
             */
            vm.sort_options = {
                accept: function (sourceItemHandleScope, destSortableScope) {
                    return function() {
                        if(sourceItemHandleScope.itemScope.item.type == MenusModel.constants.CATEGORY) {
                            return false;
                        }
                        //return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;

                        return true;
                    }();
                },
                itemMoved: function (event) {
                    var a = 1;
                },
                orderChanged: function (event) {
                    var a = 1;
                },
                containerPositioning: 'relative',
                containment: '#sortable-container'
            };
        }

    }
})();
