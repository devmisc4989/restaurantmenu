/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileAppsCtrl', ProfileAppsCtrl);

    ProfileAppsCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'AuthService'
        , 'UserService'
        , '$q'
        , 'BusinessService'
    ];

    function ProfileAppsCtrl($rootScope
        , $scope
        , $state
        , AuthService
        , UserService
        , $q
        , BusinessService) {
        var vm = this;
        /*PUBLIC*/
        vm.actions = {
            getRestaurants: getRestaurants
        };
        /*PRIVATE*/
        function getRestaurants() {
            return BusinessService.find({
                "where": {
                    "owner": $rootScope.user.id
                }
            })
        }

        activate();
        ////////////////
        function activate() {
            initialize();

            vm.password = {
                password: "",
                password_new: ""
            };

            vm.email = {
                new: "",
                confirm: ""
            };

            vm.account = {};
            vm.okMsg = '';
            vm.errMsg = '';
            vm.user = angular.copy($rootScope.user);


            function initialize() {
                $q.all([
                    getRestaurants()
                ])
                    .then(
                    function (results) {
                        vm.restaurants = results[0].data;
                        // $rootScope.myAppsInfo[0].detail[1].data = vm.restaurants
                        console.log('vm.restaurants: ', vm.restaurants)
                    }
                    , function (err) {
                        handleErr(err)
                    }
                )
            }

            function modifyBody(data) {

                return _.pick(data, 'first_name', 'last_name', 'email', 'id');
            }

            function handleErr(err) {
                if (err) {
                    if (err.message) {
                        vm.errMsg = err.message
                    } else {
                        if (_.isString(err)) {
                            vm.errMsg = err
                        } else {
                            vm.errMsg = "Unable to Change Password"
                        }
                    }
                } else {
                    vm.errMsg = "Server Request Error"
                }
            }

            function resetMsg() {
                vm.errMsg = '';
                vm.okMsg = ''
            }

            /*$rootScope.billingInfo = {
             fields: [
             {id: 0, name: 'Date'},
             {id: 1, name: 'Payment'},
             {id: 2, name: 'App'},
             {id: 3, name: 'View'}
             ],
             data: [
             {
             date: 'June 1 / 2016',
             payment: '$20',
             app: 'menucloud'
             },{
             date: 'June 1 / 2016',
             payment: '$20',
             app: 'menucloud'
             }
             ]
             };*/
            vm.restaurants = [];
            vm.apps = [
                {
                    selectedTab: 0,
                    buttonText: 'UPGRADE',
                    description: {
                        logo: {
                            img: 'app/img/logo5.png',
                            title: ''
                        },
                        role: 'FREE',
                        text: 'menuCLOUD is your all in one easy to use menu manager and publisher. Managae, design and publish your menus all from within one cloud based app.'
                    },
                    details: {
                        subscription: {
                            id: 0,
                            css: 'right-space',
                            name: 'Your subscription',
                            data: [
                                {id: 0, val: 'Free'},
                                {id: 1, val: '$0/month'}
                            ]
                        },
                        restaurants: [{
                            id: 0,
                            css: 'has-separate',
                            name: 'Added restaurants',
                            data: vm.restaurants

                        }]
                    }
                }
            ];
            vm.restaurants = [
                {id: 0, val: 'Restaurant one'},
                {id: 1, val: 'Restaurant two'},
                {id: 2, val: 'Restaurant three'}
            ];

            $scope.editBillingInfo = function () {
                var htmlText =
                    "<div class='form-wrapper'>" +
                    "<div class='form-item'>" +
                    "<input type='text' ng-model='' placeholder='Cardholders name'>" +
                    "</div>" +
                    "<div class='form-item'>" +
                    "<input type='number' ng-model='' placeholder='Card number'>" +
                    "</div>" +
                    "<div class='form-item col-50 float-left icon-right icon-calendar1'>" +
                    "<input type='number' ng-model='' placeholder='Year'>" +
                    "</div>" +
                    "<div class='form-item col-50 float-right icon-right icon-calendar1'>" +
                    "<input type='number' ng-model='' placeholder='Month '>" +
                    "</div>" +
                    "<div class='float-clear'></div>" +
                    "<div class='form-item col-50 float-left icon-right icon-calendar1'>" +
                    "<input type='number' ng-model='' placeholder='CVV'>" +
                    "</div>" +
                    "<div class='float-clear'></div>" +
                    "</div>";

                swal({
                    title: "PAYMENT DETAILS",
                    text: htmlText,
                    imageUrl: null,
                    customClass: "app-alert has-close-button form-alert no-fieldset",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: "Edit",
                    cancelButtonText: "",
                    allowOutsideClick: true,
                    html: true
                }, function () {
                    console.log('click edit billing info');
                });
            };
        }
    }

})();
