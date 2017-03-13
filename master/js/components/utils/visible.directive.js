/**
 * Visible
 * @desc Simple directive that sets the visibility to hidden or visible (but not collapse):
 * @namespace app.notification.directives
 */
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('visible', visible);

    /**
     * @namespace Visible
     */
    function visible() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.utils
         */
        var directive = {
            restrict: 'A',
            link: function (scope, element, attributes) {
                scope.$watch(attributes.visible, function (value) {
                    element.css('visibility', value ? 'visible' : 'hidden');
                })
            }
        };

        return directive;
    }
})();