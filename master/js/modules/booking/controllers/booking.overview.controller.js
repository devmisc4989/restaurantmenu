(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingOverviewCtrl', BookingOverviewCtrl);

    BookingOverviewCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$window',
        '$mdDialog',
        'BusinessService',
        'NotificationService'
    ];

    function BookingOverviewCtrl($rootScope, $scope, $window, $mdDialog, BusinessService, NotificationService) {

        var vm = this;

        vm.new_booking = new_booking;
        vm.setting = setting;
        vm.businesses = [];
        vm.selected_business = '';
        vm.search_booking_text ='';
        vm.set_focus_on_text = set_focus_on_text;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function activate() {
            // When new business is selected booking list should be updated
            $scope.$watch('vm.selected_business', function () {
                if (vm.selected_business) {
                    $rootScope.$broadcast('booking_list.update', {
                        business: vm.selected_business
                    });
                }
            });

            $scope.$watch('vm.search_booking_text', function () {
                if (vm.selected_business) {
                    $rootScope.$broadcast('booking_list.filter', {
                        text: vm.search_booking_text
                    });
                }
            });

            configure_layout();
            get_businesses();
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function configure_layout() {
            $rootScope.$broadcast('topnavbar.update', {
                title: 'BOOKING OVERVIEW'
            });

            // THIS SHOULD BE DELETED
            $rootScope.app.layout.hasSubTopNavBar = false;

            // IN FAVOR TO THIS:
            $rootScope.$broadcast('layout.update', {
                has_sub_topnavbar: false
            });

            NotificationService.configure({subnavbar: false});
        }

        /**
         * @name new_booking
         * @desc Create new booking
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function new_booking($event) {
            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: "/app/views/booking/dialogs/booking.add.html",
                clickOutsideToClose: true,
                escapeToClose: true,
                controllerAs: 'vm',
                controller: "BookingAddDialogCtrl"
            }).then(dialog_success_fn);

            /**
             * @name dialog_success_fn
             * @desc Update list array on view
             */
            function dialog_success_fn(data, status, headers, config) {
                $rootScope.$broadcast('booking_list.add', {
                    item: data
                });
            }
        }

        /**
         * @name setting
         * @desc setting dialog
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function setting($event) {
        }

        /**
         * @name get_businesses
         * @desc Retrieve booking list
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function get_businesses() {
            BusinessService.find().then(find_success_fn, find_error_fn);

            /**
             * @name find_success_fna
             * @desc Update list array on view
             */
            function find_success_fn(data, status, headers, config) {
                vm.businesses = data.data;
                select_initial_business();
            }

            /**
             * @name find_error_fn
             * @desc Show snackbar with error
             */
            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                NotificationService.give_error_feedback(MenusModel.feedback.get_businesses_fail);
            }
        }

        /**
         * @name select_initial_business
         * @desc Layout configuration
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function select_initial_business() {
            if (vm.businesses.length) {
                vm.selected_business = vm.businesses[0];
            }
        }

        function set_focus_on_text(){
            var element = $window.document.getElementById('input_search_box');
            if(element)
                element.focus();
        }

    }
})();
