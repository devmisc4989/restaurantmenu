/**
 * Toolbar
 * @namespace app.menu.directives
 */
(function () {
    'use strict';

    angular
        .module('app.menu.directives')
        .directive('toolbar', toolbar);

    /**
     * @namespace Toolbar
     */
    function toolbar($window, $mdMedia) {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.menu.directives.toolbar
         */
        var directive = {
            restrict: 'E',
            scope: {
                menuData: '='
            },
            controller: 'MenuToolbarCtrl',
            controllerAs: 'vm',
            templateUrl: '/app/views/menu/editor/toolbar.html',
            link: link
        };

        var NAVBARS_HEIGHT = 111;
        var TOOLBAR_ID = 'menu-toolbar';
        var OFFSET = 20;

        return directive;

        function link(scope, element, attributes, controller) {

            /**
             * @desc Event to be triggered when detecting screen size
             */
            scope.$watch(function () {
                return $mdMedia('(max-width: 959px)');
            }, function (small_screen) {
                scope.vm.small_screen = small_screen;

                var coordinates = get_coordinates(element);

                if (small_screen) {
                    position_vertically(coordinates, scope);
                }
                else {
                    position_horizontally(coordinates, scope);
                }
            });

            /**
             * @desc Make toolbar always be visible in the viewport
             */
            angular.element($window).bind("scroll", function () {

                var coordinates = get_coordinates(element);

                if (scope.vm.small_screen) {
                    position_vertically(coordinates, scope);
                }
                else {
                    position_horizontally(coordinates, scope);
                }

                scope.$apply();
            });
        }

        /**
         * @name position_vertically
         * @memberOf app.menu.directives.toolbar
         */
        function position_vertically(coordinates, scope) {
            scope.vm.style = {};
            //scope.vm.style = {
            //    top: coordinates.document_view_bottom - 250,
            //    right: -40
            //};
        }

        /**
         * @name position_horizontally
         * @memberOf app.menu.directives.toolbar
         */
        function position_horizontally(coordinates, scope) {
            if (coordinates.element_top < NAVBARS_HEIGHT) {
                //console.log('Header is above view');
                scope.vm.style = {top: OFFSET + coordinates.document_view_top - coordinates.client_top};
            }
            else if (coordinates.element_bottom > $window.innerHeight) {
                //console.log('Header is below view');
                scope.vm.style = {top: coordinates.document_view_bottom - 2 * coordinates.toolbar_height - OFFSET};
            }
        }

        /**
         * @name get_coordinates
         * @memberOf app.menu.directives.toolbar
         */
        function get_coordinates(element) {
            var document_view_top = $window.pageYOffset;
            var document_view_bottom = document_view_top + $window.innerHeight;
            var client_top = document.documentElement.clientTop;

            var toolbar = angular.element(element[0].querySelector('#' + TOOLBAR_ID));
            var box = toolbar[0].getBoundingClientRect();

            var element_top = box.top;
            var element_bottom = box.bottom;
            var toolbar_height = element_bottom - element_top;

            return {
                document_view_top: document_view_top,
                document_view_bottom: document_view_bottom,
                client_top: client_top,
                element_top: element_top,
                element_bottom: element_bottom,
                toolbar_height: toolbar_height
            }

        }
    }
})();