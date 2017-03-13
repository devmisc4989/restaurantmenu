(function() {
    'use strict';

    angular
        .module('app.restaurant')
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
        // .state('app.restaurant-overview', {
        //   url: '/restaurant-overview',
        //   title: 'RestaurantOverview',
        //   templateUrl: helper.basepath('restaurant/restaurant-overview.html')
        // })
        
        .state('app.restaurant', {
          url: '/restaurant',
          title: 'RESTAURANTS',
          controller: "RestaurantListCtrl",
          controllerAs: "vm",
          templateUrl: helper.basepath('restaurant/list.html'),
          resolve:{
            list: function (BusinessService){
              return BusinessService.find().then(function (res){
                console.log('resolved: ', res.data);
                return res.data
              })
            }
          }
        })
        .state('app.restaurant-manage', {
          url: '/restaurant/:id',
          title: 'RESTAURANT',
          controller: "RestaurantCtrl",
          controllerAs: "vm",
          templateUrl: helper.basepath('restaurant/manage.html'),
          resolve:{
            restaurant: function (BusinessService, $stateParams){
              return BusinessService.get($stateParams.id).then(function (res){
                console.log('resolved: ', res.data);
                return res.data
              })
            }
          }
        })
      
    }

})();