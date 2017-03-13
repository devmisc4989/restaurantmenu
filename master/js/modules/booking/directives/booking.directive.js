/**
* bookingItem
* @namespace app.booking.directives
*/
(function () {
	'use strict';

	angular
		.module('app.booking.directives')
		.directive('bookingItem', bookingItem);

	/**
	* @namespace bookingItem
	*/
	function bookingItem($compile) {

		/**
		* @name directive
		* @desc The directive to be returned
		* @memberOf app.booking.directives.Menu
		*/
		var directive = {
			restrict: 'E',
			scope: {
				item: '=booking'
			},
            controller: 'BookingCtrl',
	    	controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return '/app/views/booking/booking.html';
                }
            }
		};

		return directive;
	}

})();