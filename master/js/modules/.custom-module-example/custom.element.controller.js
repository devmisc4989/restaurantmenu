/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function() {
    'use strict';

    angular
      .module('menucloud.custom')
      .controller('CustomElementCtrl', CustomElementCtrl);

    CustomElementCtrl.$inject = [
      '$rootScope'
      ,'$scope'
      ,'$state'
      ,'$stateParams'
      ,'dialogs'
      ,'$moment'
    ];
    
    function CustomElementCtrl($rootScope, $scope, $state, $stateParams, dialogs, $moment) {
      var vm = this;

      
      activate();

      ////////////////
      
      function activate() {
        /*SomeService.find().then(
          function (res){
            vm.element res.data
            //success
            console.log('data: ', res.data)
          },
          function (res){
            // fail
            console.log('error: ', res.data)
          }
        )*/
      }
    }
    
})();
