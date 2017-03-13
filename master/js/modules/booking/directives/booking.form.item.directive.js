/**
* bookingFormItem
* @namespace app.booking.directives
*/
(function () {
    'use strict';

    angular
        .module('app.booking.directives')
        .directive('bookingFormItem', bookingFormItem);

    /**
    * @namespace bookingFormItem
    */
    function bookingFormItem($compile) {

        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf app.booking.directives.Menu
        */
        var directive = {
            restrict: 'E',
            scope: {
                item: '=',
                type: '=type',
            },
            controller: 'BookingFormItemCtrl',
            controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return resolve_template(scope.type);
                }
            }
        };

        return directive;
    }

    function resolve_template(type) {
        switch(type){
        case 'text':
            return '/app/views/booking/form/form.text.html';
        case 'textarea':
            return '/app/views/booking/form/form.textarea.html';
        case 'number':
            return '/app/views/booking/form/form.number.html';
        case 'header':
            return '/app/views/booking/form/form.header.html';
        case 'dropdown':
            return '/app/views/booking/form/form.dropdown.html';
        case 'list':
            return '/app/views/booking/form/form.list.html';
        case 'checkbox':
            return '/app/views/booking/form/form.checkbox.html';
        case 'radio':
            return '/app/views/booking/form/form.radio.html';
        case 'file':
            return '/app/views/booking/form/form.file.html';
        case 'menu':
            return '/app/views/booking/form/form.menu.html';
        case 'quote':
            return '/app/views/booking/form/form.quote.html';
        }
    }

})();