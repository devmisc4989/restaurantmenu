/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.restaurant')
        .controller('RestaurantCtrl', RestaurantCtrl);

    RestaurantCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'restaurant'
        , 'BusinessService'
        , '$mdDialog'
    ];

    function RestaurantCtrl
    ($rootScope,
     $scope,
     $state,
     restaurant,
     BusinessService,
     $mdDialog) {

        var vm = this;
        vm.restaurant = restaurant;

        vm.actions = {
            updatePlaceData: updatePlaceData,
            updateContact: updateContact,
            updateLocation: updateLocation,
            updateRestaurant: updateRestaurant,
            addCollaborator: addCollaborator
        };

        activate();

        ////////////////

        function activate() {

            $rootScope.tabId = 0;
            
            configure_layout();
            updateSubTopNav();

            vm.contact = {};
            vm.okMsg = '';
            vm.errMsg = '';
            vm.edit = {
                contact: {
                    location: false,
                    email: false,
                    phone: false,
                    description: false
                }
            };

            vm.updateContactLocation = function () {
                vm.okMsg = '';
                vm.errMsg = '';
                if (vm.locationForm.$valid) {


                    // vm.errMsg = 'Server request error';
                    // vm.okMsg = 'Contact email have been changed';
                    vm.edit.contact.location = false;
                } else {
                    vm.locationForm.location.$dirty = true;
                }
            };

            vm.updateContactEmail = function () {
                vm.okMsg = '';
                vm.errMsg = '';
                if (vm.emailForm.$valid) {


                    // vm.errMsg = 'Server request error';
                    // vm.okMsg = 'Contact email have been changed';
                    vm.edit.contact.email = false;
                } else {
                    vm.emailForm.email.$dirty = true;
                    vm.emailForm.confirm_email.$dirty = true;
                }
            };

            vm.updateContactPhone = function () {
                vm.okMsg = '';
                vm.errMsg = '';
                if (vm.phoneForm.$valid) {


                    // vm.errMsg = 'Server request error';
                    // vm.okMsg = 'Contact email have been changed';
                    vm.edit.contact.phone = false;
                } else {
                    vm.phoneForm.phonenumber.$dirty = true;
                    vm.phoneForm.confirm_phonenumber.$dirty = true;
                }
            };

            vm.updateContactDescription = function () {
                vm.okMsg = '';
                vm.errMsg = '';
                vm.edit.contact.description = false;
                // vm.errMsg = 'Server request error';
                // vm.okMsg = 'Contact email have been changed';
                vm.edit.contact.description = false;
            };

            $rootScope.app.layout.hasSubTopNavBar = true;
            console.log('hasSubTopBar', $rootScope.app.layout.hasSubTopNavBar);

            /*
             GOOGLE PLACES scope
             auto complete
             */
            // vm.ac_search = '' //searchfield
            // vm.ac_details = null // google place data will be here
            // vm.ac_options = { // options to obtain place details
            //   type: 'geocode',
            //   types: 'establishment',
            //   // bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
            //   country: 'ca',
            //   language: 'eng',
            //   typesEnabled: false,
            //   boundsEnabled: false,
            //   componentEnabled: false,
            //   watchEnter: true
            // };
            // vm.plain_address = vm.restaurant.address.line_1+" "+vm.restaurant.address.line_2+" "+vm.restaurant.address.city+" "+vm.restaurant.address.postal_code

            // vm.getPlainAddress = function (){
            //   vm.plain_address = vm.restaurant.address.line_1+" "+vm.restaurant.address.line_2+" "+vm.restaurant.address.city+" "+vm.restaurant.address.postal_code
            //   return vm.restaurant.address.line_1+" "+vm.restaurant.address.line_2+" "+vm.restaurant.address.city+" "+vm.restaurant.address.postal_code
            // }
            //  // vm.updatePlaceData = updatePlaceData
            // /*
            //  GOOGLE PLACES scope
            //  auto complete
            //  */
            // $scope.$watch('vm.ac_details', function (data) {
            //   if (data) {
            //     vm.contact.place_data = {}
            //     console.log('place details: ', data)
            //     var addr = {
            //       line_1: "",
            //       line_2: "",
            //       city: "",
            //       region: "",
            //       country: "",
            //       postal_code: "",
            //       place_id: data.place_id
            //     }
            //     _.each(data.address_components, function (el, key, list) {
            //       if (el.types) {
            //         if (el.types.indexOf("route") != -1) addr.line_1 = addr.line_1 + " " + el.long_name
            //         if (el.types.indexOf("street_number") != -1) addr.line_1 = el.long_name + addr.line_1
            //         if (el.types.indexOf("administrative_area_level_1") != -1) addr.region += el.long_name
            //         if (el.types.indexOf("country") != -1) addr.country += el.long_name
            //         if (el.types.indexOf("postal_code") != -1) addr.postal_code += el.long_name
            //         // sometimes city comes as sublocality and sometimes as locality
            //         if (el.types.indexOf("sublocality") != -1 && el.types.indexOf("sublocality_level_1") != -1) addr.city = el.long_name
            //         if (el.types.indexOf("locality") != -1 && el.types.indexOf("political") != -1) addr.city = el.long_name
            //       }
            //     });
            //     vm.restaurant.address = addr
            //     console.log("vm.restaurant.address : ", vm.restaurant.address )
            //     vm.actions.updatePlaceData(data)
            //   }
            // })
            /*********************************/


        }

        function updateLocation() {
            var body = _.omit(vm.restaurant, 'point_of_contact');
            vm.actions.updateRestaurant(body)
        }

        vm.collaborator = {
            first_name: ''
            , last_name: ''
            , email: ''
        };

        // addCollaborator dialog will return updated restaurant
        function addCollaborator($event) {

            var dialog = $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: "/app/views/restaurant/dialogs/collaborator.add.html",
                clickOutsideToClose: true,
                resolve: {
                    restaurant: function () {
                        return vm.restaurant
                    }
                },
                escapeToClose: true,
                controllerAs: 'dialog',
                controller: "CollaboratorAddCtrl"
            });

            dialog.then(
                function (result) {
                    console.log('result: ', result);
                    vm.restaurant = result
                }
                , function (closed) {
                    console.log('closed: ', closed)
                }
            )

        }

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
                _.extend(vm.restaurant, merge_data);
            }
        }


        function updateSubTopNav() {

            $rootScope.$broadcast('subtopnavbar.update', {
                    uri: 'app.restaurant',
                    title: 'Restaurants'
            });

            $rootScope.subtopnavbar = {
                tabId: 0,
                navBack: {
                    uri: 'app.restaurant',
                    title: 'Restaurants'
                },
                items: [
                    {title: 'Contact', iconClass: 'icon-profile'},
                    {title: 'Access', iconClass: 'icon-manage-apps'}
                ]
            };
        }

        function sanitizeBody(body) {
            body = _.omit(body, 'owner', 'creator');
            if (body.users) {
                body.users = _.map(body.users, function (el, key, list) {
                    if (_.isObject(el)) {
                        el = el.id
                    }
                    return el

                });
            }
            return body

        }

        function updateRestaurant(body) {
            console.log("updateRestaurant");
            vm.okMsg = '';
            vm.errMsg = '';
            if (!body) body = vm.restaurant;
            body = sanitizeBody(body);
            if (body) {
                BusinessService.update(body).then(
                    function (res) {
                        vm.okMsg = "Restaurant has been updated";
                        vm.restaurant = res.data
                    }
                    , function (res) {
                        console.log('Error updating restaurant')
                    }
                )
            } else {
                console.log('no body')
            }
        }

        function updateContact() {
            var body = _.pick(vm.restaurant, 'point_of_contact', 'id');

            vm.actions.updateRestaurant(body);

        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.restaurant.RestaurantCtrl
         */
        function configure_layout() {

            $rootScope.$broadcast('topnavbar.update', {
                title: vm.restaurant.name
            });

            //$rootScope.$broadcast('layout.update', {
            //    has_sub_topnavbar: false
            //});
        }
    }

})();
