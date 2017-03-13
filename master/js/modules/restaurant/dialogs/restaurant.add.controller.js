/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantAddDialogCtrl', RestaurantAddDialogCtrl);

  RestaurantAddDialogCtrl.$inject = [
    '$rootScope'
    , '$scope'
    , '$state'
    , 'BusinessService'
    , '$mdDialog'

  ];

  function RestaurantAddDialogCtrl(
    $rootScope
    , $scope
    , $state
    , BusinessService
    , $mdDialog

  ) {
    var dialog = this;
    dialog.restaurant = {};
    /*
     GOOGLE PLACES scope
     auto complete
     */
    dialog.ac_search = ''; //searchfield
    dialog.ac_details = null; // google place data will be here
    dialog.ac_options = { // options to obtain place details
      type: 'geocode',
      types: 'establishment',
      // bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
      country: 'ca',
      language: 'eng',
      typesEnabled: false,
      boundsEnabled: false,
      componentEnabled: false,
      watchEnter: true
    };
    
     // dialog.updatePlaceData = updatePlaceData
    /*
     GOOGLE PLACES scope
     auto complete
     */
    $scope.$watch('dialog.ac_details', function (data) {
      if (data) {
        dialog.restaurant.place_data = {};
        console.log('place details: ', data);
        var addr = {
          line_1: "",
          line_2: "",
          city: "",
          region: "",
          country: "",
          postal_code: "",
          place_id: data.place_id
        };
        _.each(data.address_components, function (el, key, list) {
          if (el.types) {
            if (el.types.indexOf("route") != -1) addr.line_1 = addr.line_1 + " " + el.long_name;
            if (el.types.indexOf("street_number") != -1) addr.line_1 = el.long_name + addr.line_1;
            if (el.types.indexOf("administrative_area_level_1") != -1) addr.region += el.long_name;
            if (el.types.indexOf("country") != -1) addr.country += el.long_name;
            if (el.types.indexOf("postal_code") != -1) addr.postal_code += el.long_name;
            // sometimes city comes as sublocality and sometimes as locality
            if (el.types.indexOf("sublocality") != -1 && el.types.indexOf("sublocality_level_1") != -1) addr.city = el.long_name;
            if (el.types.indexOf("locality") != -1 && el.types.indexOf("political") != -1) addr.city = el.long_name
          }
        });
        dialog.restaurant.address = addr;
        console.log("dialog.restaurant.address : ", dialog.restaurant.address );
        updatePlaceData(data)
      }
    });
    function updatePlaceData(data) {
      console.log('updatePlaceData: ');
      if (data) {
        var merge_data = {
          opening_hours: _.omit(data.opening_hours, 'open_now')
          , place_id: data.place_id
          , website: data.website
          , name: data.name
          , phone: data.formatted_phone_number
          , formatted_address: data.formatted_address
          , international_phone_number: data.international_phone_number
        };

        if (data.geometry && data.geometry.location) {
          if (data.geometry.location.lat) merge_data.lat = data.geometry.location.lat();
          if (data.geometry.location.lng) merge_data.lng = data.geometry.location.lng()
        }
        console.log('data :', merge_data);
        _.extend(dialog.restaurant, merge_data);
      }
    }
    /*********************************/
    ///////////////////////////////////////
    function activate(){
      dialog.hide = function() {
        $mdDialog.hide();
      };
      dialog.cancel = function() {
        $mdDialog.cancel();
      };
      dialog.answer = function(answer) {
        if(dialog.dialogForm.$valid){
          dialog.disabled = true;

          BusinessService.create(dialog.restaurant).then(
            function (res){
              dialog.disabled = false;
              $mdDialog.hide(res.data);
            },
            function (res){
              dialog.disabled = false;
              console.log('err: ', res.data)
            }
          )
        }else{
          console.log('invalid form')
        }
        
      };
    }

    activate()
  }

})();
