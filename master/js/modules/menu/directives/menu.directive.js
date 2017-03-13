/**
* menuItem
* @namespace app.menu.directives
*/
(function () {
	'use strict';

	angular
		.module('app.menu.directives')
		.directive('menuItem', menuItem);

	/**
	* @namespace menuItem
	*/
	function menuItem($compile) {

		/**
		* @name directive
		* @desc The directive to be returned
		* @memberOf app.menu.directives.Menu
		*/
		var directive = {
			restrict: 'E',
			scope: {
				item: '=menu',
				menuType: '=menuType',
                sortable: '=sortable'
			},
            controller: 'MenuCtrl',
	    	controllerAs: 'vm',
            template: '<div ng-include="getContentUrl()"></div>',
            link: function (scope, element, attrs) {
                scope.getContentUrl = function () {
                    return resolve_template(scope.sortable);
                }
            }

            // TODO there is no need to load new template for menu,
            // all we need is to add new attribute
            // 'data-as-sortable-item-handle' to elements first child
            // this should be changed in the future

            //link: function(scope, element, attrs) {
            //    var div = element.children().first();
            //  div.attr('data-as-sortable-item-handle', '');
            //  //$compile(div.contents())(scope);
            //
            //}
		};

		return directive;
	}

    function resolve_template(sortable) {
        if (sortable) {
            return '/app/views/menu/menu-sortable.html'
        }
        else {
            return '/app/views/menu/menu.html';
        }
    }
})();