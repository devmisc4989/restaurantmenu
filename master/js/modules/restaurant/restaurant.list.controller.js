/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.restaurant')
        .controller('RestaurantListCtrl', RestaurantListCtrl);

    RestaurantListCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'list'
        , 'BusinessService'
        , '$timeout'
        , '$mdDialog'
    ];

    function RestaurantListCtrl($rootScope
        , $scope
        , $state
        , list
        , BusinessService
        , $timeout
        , $mdDialog) {
        var vm = this;
        vm.list = list;

        vm.actions = {
            getRestaurants: getRestaurants
            , destroyRestaurant: destroyRestaurant
            , addRestaurant: addRestaurant
        };
        function addRestaurant($event) {
            var dialog = $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: "/app/views/restaurant/dialogs/restaurant.add.html",
                clickOutsideToClose: true,
                escapeToClose: true,
                controllerAs: 'dialog',
                controller: "RestaurantAddDialogCtrl"
            });

            dialog.then(
                function (result) {
                    console.log('result: ', result);
                    vm.list.push(result)
                }
                , function (closed) {
                    console.log('closed: ', closed)
                }
            )
        }

        function destroyRestaurant(item) {
            var restaurant = item;

            vm.list = _.reject(vm.list, function (el, i, list) {
                return el.id === item.id;
            });

            BusinessService.destroy(item).then(
                function (res) {
                    console.log('removed: ', res.data)
                }
                , function (res) {
                    vm.list.push(restaurant);
                    console.log('err: ', res)
                }
            )
        }

        function getRestaurants() {
            BusinessService.find().then(
                function (res) {
                    vm.list = res.data;
                    console.log('vm.list: ', vm.list)
                }
                , function (res) {
                    console.log("err: ", res)
                }
            )
        }

        // vm.updatePlaceData = updatePlaceData
        /*
         GOOGLE PLACES scope
         auto complete
         */
        /*vm.ac_search = '' //searchfield
         vm.ac_details = null // google place data will be here
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
         $rootScope.$watch('vm.ac_details', function (data) {
         if (data) {
         vm.newRestaurant.place_data = {}
         console.log('place details: ', data)
         var addr = {
         line_1: "",
         line_2: "",
         city: "",
         region: "",
         country: "",
         postal_code: "",
         place_id: data.place_id
         }
         _.each(data.address_components, function (el, key, list) {
         if (el.types) {
         if (el.types.indexOf("route") != -1) addr.line_1 = addr.line_1 + " " + el.long_name
         if (el.types.indexOf("street_number") != -1) addr.line_1 = el.long_name + addr.line_1
         if (el.types.indexOf("administrative_area_level_1") != -1) addr.region += el.long_name
         if (el.types.indexOf("country") != -1) addr.country += el.long_name
         if (el.types.indexOf("postal_code") != -1) addr.postal_code += el.long_name
         // sometimes city comes as sublocality and sometimes as locality
         if (el.types.indexOf("sublocality") != -1 && el.types.indexOf("sublocality_level_1") != -1) addr.city = el.long_name
         if (el.types.indexOf("locality") != -1 && el.types.indexOf("political") != -1) addr.city = el.long_name
         }
         });
         vm.newRestaurant.address = addr
         vm.updatePlaceData(data)
         }
         })


         function updatePlaceData(data) {
         console.log('updatePlaceData: ')
         if (data) {
         var merge_data = {
         opening_hours: _.omit(data.opening_hours, 'open_now')
         , place_id: data.place_id
         , website: data.website
         , name: data.name
         , phone: data.formatted_phone_number
         , formatted_address: data.formatted_address
         , international_phone_number: data.international_phone_number
         }

         if (data.geometry && data.geometry.location) {
         if (data.geometry.location.lat) merge_data.lat = data.geometry.location.lat()
         if (data.geometry.location.lng) merge_data.lng = data.geometry.location.lng()
         }
         vm.newRestaurant.place_data = _.extend(vm.newRestaurant.place_data, merge_data);
         }
         }*/

        activate();


        ////////////////

        function activate() {

            configure_layout();

            //$rootScope.topnavbar.title = 'RESTAURANTS';
            $rootScope.app.layout.hasSubTopNavBar = false;

            // vm.newRestaurant = {
            //   place_data: {},
            //   address: {},
            //   email: '',
            //   phone: ''
            // };

            // $scope.addRestaurant = function () {
            //   var htmlText =
            //     "<form class='form-wrapper' ng-controller='RestaurantListCtrl as vm'>" +
            //     "<div class='form-item'>" +
            //     "<input type='text' ng-model='' placeholder='Name'>" +
            //     "</div>" +
            //     "<div class='form-item icon-right icon-location-pin2'>" +
            //     "<input id='locationInput' type='text' placeholder='Find location' name='place_data' ng-model='vm.ac_search' ng-autocomplete='' options='vm.ac_options' details='vm.ac_details'>" +
            //     "</div>" +
            //     "<div class='form-item'>" +
            //     "<input type='text' ng-model='' placeholder='Address'>" +
            //     "</div>" +
            //     "<div class='form-item'>" +
            //     "<input type='email' ng-model='' placeholder='Mail'>" +
            //     "</div>" +
            //     "<div class='form-item'>" +
            //     "<input type='number' ng-model='' placeholder='Phone'>" +
            //     "</div>" +
            //     "</form>";

            //   swal({
            //     title: "ADD A NEW RESTAURANT TO MENU CLOUD",
            //     text: htmlText,
            //     imageUrl: null,
            //     customClass: "app-alert has-close-button form-alert no-fieldset",
            //     showCancelButton: true,
            //     confirmButtonColor: "#5bc0de",
            //     confirmButtonText: "ADD",
            //     cancelButtonText: "",
            //     allowOutsideClick: true,
            //     html: true
            //   }, function () {
            //     console.log('click add restaurant New Restaurant: ', vm.newRestaurant);
            //   });

            //   $timeout(function () {
            //     var element = angular.element(document.querySelector('#locationInput'));
            //     var scope = element.scope();
            //     var $compile = element.injector().get('$compile');
            //     $compile(element)(scope);
            //   }, 0);
            // };

            // $scope.deleteRestaurant = function () {
            //   swal({
            //     title: "",
            //     text: "ARE YOU SURE YOU WANT TO DELETE <br> RESTAURANT A?",
            //     imageUrl: null,
            //     customClass: "app-alert no-title no-fieldset",
            //     showCancelButton: true,
            //     confirmButtonColor: "rgba(253,105,96,1)",
            //     confirmButtonText: "DELETE",
            //     cancelButtonText: "CANCEL",
            //     allowOutsideClick: true,
            //     html: true
            //   }, function () {
            //     console.log('click delete restaurant');
            //   });
            // };
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.menu.RestaurantListCtrl
         */
        function configure_layout() {

            $rootScope.$broadcast('topnavbar.update', {
                title: 'RESTAURANTS'
            });

            //$rootScope.$broadcast('layout.update', {
            //    has_sub_topnavbar: false
            //});
        }
    }

})();
