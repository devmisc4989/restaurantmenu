(function() {
    'use strict';

    angular
        .module('app.profile')
        .config(Config);
        
    Config.$inject = [
      '$stateProvider'
      ,'RouteHelpersProvider'
      ,'$urlRouterProvider'
    ];

    function Config(
      $stateProvider
      ,helper
      ,$urlRouterProvider
    ){
      // @NOTE: this is guide template router. views does not exists
      
      $stateProvider
        .state('app.profile', {
          url: '/profile',
          title: 'Profile',
          controller: "ProfileCtrl",
          controllerAs: "vm",
          templateUrl: helper.basepath('profile/index.html'),
          resolve:{
            restaurants: function (BusinessService, $rootScope){
              return BusinessService.find({
                "where":{
                  "owner": $rootScope.user.id
                }
              }).then(
                function (res){
                  return res.data
                }
              )
            }
          }
        })
      
    }

})();