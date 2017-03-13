/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function() {
    'use strict';

    angular
      .module('menucloud.custom')
      .controller('CustomListCtrl', CustomListCtrl);

    CustomListCtrl.$inject = [
      '$rootScope'
      ,'$scope'
      ,'$state'
      ,'$stateParams'
      ,'dialogs'
      ,'$moment'
    ];
    
    function CustomListCtrl($rootScope, $scope, $state, $stateParams, dialogs, $moment) {
      var vm = this;
      vm.errMsg = '';
      vm.title = 'Custom List';
      
      
      ////////////////
      
      function activate() {
        /**/
        /*event listeners*/
        
      }
    }
    
})();
