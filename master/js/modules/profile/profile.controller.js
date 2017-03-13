/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'AuthService'
        , 'UserService'
        , '$q'
        , 'BusinessService'
        , 'restaurants'
    ];

    function ProfileCtrl($rootScope
        , $scope
        , $state
        , AuthService
        , UserService
        , $q
        , BusinessService
        , restaurants) {
        var vm = this;

        function initializNav() {
            //$rootScope.topnavbar.title = 'SETTINGS';

            $rootScope.subtopnavbar = {
                tabId: 0,
                navBack: {
                    uri: 'app.dashboard',
                    title: 'Dashboard'
                },
                items: [
                    {title: 'Profile', iconClass: 'icon-profile'}
                    // ,{title: 'Billings', iconClass: 'icon-billing'}
                ]
            };
            // Hide manageApps tab if user doesnt have ownership of any restaurants
            console.log('restaurants: ', restaurants);
            if (restaurants && restaurants.length) $rootScope.subtopnavbar.items.push({
                title: 'Manage Apps',
                iconClass: 'icon-manage-apps'
            });
            $rootScope.tabId = 0;
            $rootScope.app.layout.hasSubTopNavBar = true;
        }

        initializNav();

        activate();

        ////////////////

        function activate() {

            configure_layout();

            vm.changePassword = changePassword;
            vm.updateProfile = updateProfile;

            // console.log('hasSubTopBar', $rootScope.app.layout.hasSubTopNavBar);

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

            function updateProfile() {
                resetMsg();
                var body = modifyBody(vm.user);

                UserService.update(body).then(
                    function (res) {
                        $rootScope.$emit("$updateUserProfile", res.data);
                        vm.user = angular.copy($rootScope.user);
                        vm.okMsg = "Your profile has been updated"
                    }
                    , function (err) {
                        handleErr(err)
                    }
                )
            }

            function resetPasswordFields() {
                vm.password = {};
                console.log('vm.passwordForm.confirm_password:', vm.passwordForm.confirm_password);
                vm.passwordForm.confirm_password.$dirty = false;
                vm.passwordForm.password.$dirty = false;
                vm.passwordForm.password_new.$dirty = false;
                vm.passwordForm.confirm_password.$touched = false;
                vm.passwordForm.password.$touched = false;
                vm.passwordForm.password_new.$touched = false
            }

            function changePassword() {
                vm.okMsg = '';
                vm.errMsg = '';

                if (vm.passwordForm.$valid) {
                    var body = _.pick(vm.password, "password", "password_new");
                    console.log('Body: ', body);
                    AuthService.changePassword(body).then(function (data) {
                        console.log('data: ', data);
                        vm.okMsg = 'Your password has been updated!';
                        resetPasswordFields();
                        // $rootScope.profile.password.edit = false;
                    }, function (err) {
                        console.log('err: ', err);
                        resetPasswordFields();
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
                    });
                } else {
                    console.log('invalid form');
                    vm.passwordForm.password.$dirty = true;
                    vm.passwordForm.password_new.$dirty = true;
                    vm.passwordForm.password_confirm.$dirty = true;
                }
            }


            // $rootScope.billingInfo = {
            //   fields: [
            //     {id: 0, name: 'Date'},
            //     {id: 1, name: 'Payment'},
            //     {id: 2, name: 'App'},
            //     {id: 3, name: 'View'}
            //   ],
            //   data: [
            //     {
            //       date: 'June 1 / 2016',
            //       payment: '$20',
            //       app: 'menucloud'
            //     },{
            //       date: 'June 1 / 2016',
            //       payment: '$20',
            //       app: 'menucloud'
            //     }
            //   ]
            // };

        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.menu.ProfileCtrl
         */
        function configure_layout() {

            $rootScope.$broadcast('subtopnavbar.update', {
                uri: 'app.dashboard',
                title: 'Dashboard'
            });

            $rootScope.$broadcast('topnavbar.update', {
                title: 'SETTINGS'
            });
        }
    }

})();
