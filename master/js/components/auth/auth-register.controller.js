/**=========================================================
 * Component: access-register.js
 * Demo for register account api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthRegisterCtrl', AuthRegisterCtrl);

  AuthRegisterCtrl.$inject = ['$rootScope', '$scope', 'AuthService', '$state'];
  function AuthRegisterCtrl($rootScope, $scope, AuthService, $state) {
    var vm = this;
    vm.updatePlaceData = updatePlaceData;
    /*
     GOOGLE PLACES scope
     auto complete
     */
    vm.ac_search = ''; //searchfield
    vm.ac_details = null; // google place data will be here
    vm.ac_options = { // options to obtain place details
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
    $scope.$watch('vm.ac_details', function (data) {
      if (data) {
        vm.account.place_data = {};
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
        vm.account.place_data.address = addr;
        vm.updatePlaceData(data)
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
        vm.account.place_data = _.extend(vm.account.place_data, merge_data);
      }
    }

    activate();

    function geolocate() {
      if (navigator.geolocation) {
        /*navigator.geolocation.getCurrentPosition(function(position) {
         var geolocation = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
         };
         var circle = new google.maps.Circle({
         center: geolocation,
         radius: position.coords.accuracy
         });
         vm.ac_options.bounds = (circle.getBounds());
         });*/
      }
    }

    ////////////////
    function modifyBody(data) {
      return data
    }

    function activate() {
      geolocate();
      // bind here all data from the form
      vm.account = {};
      // place the message if something goes wrong
      vm.errMsg = '';
      vm.okMsg = "";

      // set form data
      setFormData();

      vm.register = function () {
        vm.errMsg = '';
        vm.okMsg = "";
        $rootScope.auth.popup.showPopup = false;

        if (vm.registerForm.$valid) {
          var body = modifyBody(vm.account);
          console.log('body: ', body);
          AuthService.register(body).then(
            function (payload) {
              // $rootScope.$emit('$login', payload)
              // $state.go('app.dashboard');
              // vm.okMsg = "We have sent you an email with instructions to activate your profile"
              console.log('signup ok');
              $rootScope.auth.popup.showPopup = true;
              $rootScope.auth.popup.receiverEmail = vm.account.email;
            }, function (err) {
              if (err) {
                if (err.message) {
                  vm.errMsg = err.message
                } else {
                  if (_.isString(err)) {
                    vm.errMsg = err
                  } else {
                    vm.errMsg = "Unable to Register New Accout"
                  }
                }
              } else {
                vm.errMsg = "Server Request Error"
              }
            }
          )
        } else {
          // set as dirty if the user click directly to login so we show the validation messages
          /*jshint -W106*/
          vm.registerForm.first_name.$dirty = true;
          vm.registerForm.last_name.$dirty = true;
          vm.registerForm.email.$dirty = true;
          vm.registerForm.email_confirm.$dirty = true;
          vm.registerForm.place_data.$dirty = true;
          vm.registerForm.terms_accepted.$dirty = true;

        }
      };

      vm.resendVerify = function () {
        vm.errMsg = '';
        vm.okMsg = "";
        $rootScope.auth.popup.showPopup = false;
        AuthService.getVerified(vm.account.email).then(
          function (payload) {
            // $rootScope.$emit('$login', payload)
            // $state.go('app.dashboard');
            // vm.okMsg = "We have sent you an email with instructions to activate your profile"
            $rootScope.auth.popup.showPopup = true;
            $rootScope.auth.popup.receiverEmail = vm.account.email;
          }, function (err) {
            if (err) {
              if (err.message) {
                vm.errMsg = err.message
              } else {
                if (_.isString(err)) {
                  vm.errMsg = err
                } else {
                  vm.errMsg = "Unable to Resend email"
                }
              }
            } else {
              vm.errMsg = "Server Request Error"
            }
          }
        )
      };

      function setFormData() {
        $rootScope.auth = {
          form: {
            title: {
              name: 'ADD YOUR PERSONAL INFO',
              description: '',
              hasIcon: false,
              icon: ''
            }
          },
          popup: {
            showPopup: false,
            title: 'VERIFY YOUR ACCOUNT',
            receiverEmail: '',
            okUri: 'page.login',
            okText: 'SIGN IN',
            resendLink: function () {
              vm.resendVerify()
            }
          }
        };
      }
    }
  }

})();
