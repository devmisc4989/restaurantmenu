(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingDetailCtrl', BookingDetailCtrl);

    BookingDetailCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        '$window',
        '$state',
        'BookingService',
        'BookingsModel',
        'NotificationService',
        'ProductsModel',
        'ProductService'
    ];

    function BookingDetailCtrl($rootScope,
                        $scope,
                        $q,
                        $window,
                        $state,
                        BookingService,
                        BookingsModel,
                        NotificationService,
                        ProductsModel,
                        ProductService) {

        var vm = this;

        vm.unselect = unselect;
        vm.booking_object = {};
        vm.bookings = [];

        var booking_object_changed = false;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingDetailCtrl
         */
        function activate() {

            var query = {};

            if (BookingsModel.selected_booking.id) {
                query = BookingsModel.selected_booking.id;
            }
            else {
                //TODO redirect here
                $state.go('app.booking')
                //query = "589b4337b218d90400e3cf64";
            }

            if (BookingsModel.bookings.length) {
                vm.bookings = BookingsModel.bookings;
            }
            else {
                //TODO redirect here
                $state.go('app.booking')
            }

            booking_object_data(query);

            configure_layout();
            initialize_leave_protection();
            initialize_listeners();            
        }

        /**
         * @name are_you_sure_prompt
         * @desc Displays prompt asking if user wants to leave the page
         * @memberOf app.booking.BookingDetailCtrl
         */
        function initialize_leave_protection() {
            var message = "Are you sure you want to leave this page?";

            $scope.$on('$stateChangeStart', function (event) {
                /*
                if (booking_object_changed) {
                    are_you_sure_prompt(message);
                }
                */
            });

            $window.onbeforeunload = function (event) {
                if (booking_object_changed) {
                    if (typeof event == 'undefined') {
                        event = $window.event;
                    }
                    if (event) {
                        event.returnValue = message;
                    }
                    return message;
                }
            };

            /**
             * @name are_you_sure_prompt
             * @desc Displays prompt asking if user wants to leave the page
             * @memberOf app.booking.BookingDetailCtrl
             */
            function are_you_sure_prompt(message) {
                var answer = confirm(message);
                if (!answer) {
                    event.preventDefault();
                }
            }
        }

        /**
         * @name initialize_listeners
         * @desc Place here all of the '$watch' and '$scope.on' functions.
         * @memberOf app.booking.BookingDetailCtrl
         */
        function initialize_listeners() {
            $scope.$watch('vm.booking_object', function (newVal, oldVal) {
                if (newVal.id && oldVal.id) {
                    booking_object_changed = true; //To prevent users from leaving with unsaved Booking Object
                }
                //console.log('changed:', vm.booking_object);
            }, true);

            $scope.$on('booking_object.changed', function (event, data) {
                BookingService.get(BookingsModel.selected_booking.id).then(find_success_fn, find_error_fn);

                function find_success_fn(data, status, headers, config) {
                    BookingsModel.selected_booking = data.data;
                    vm.booking_object = data.data;
                    $rootScope.$broadcast('booking_object.refresh');
                }

                function find_error_fn(data, status, headers, config) {
                    console.log("err: ", data);
                    // TODO display toaster here
                }                
            });
        }

        /**
         * @name booking_object
         * @desc Saves booking object
         * @memberOf app.booking.BookingDetailCtrl
         */
        function booking_object() {
            return BookingService.save(vm.booking_object, false);
        }

        /**
         * @name get_businesses
         * @desc Retrieve booking list
         * @memberOf app.booking.BookingDetailCtrl
         */
        function booking_object_data(query) {
            BookingService.get(query).then(find_success_fn, find_error_fn);

            function find_success_fn(data, status, headers, config) {
                BookingsModel.selected_booking = data.data;                
                vm.booking_object = data.data;
            }

            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                // TODO display toaster here
            }
        }

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingDetailCtrl
         */
        function update_sub_top_nav() {
            $rootScope.app.layout.hasSubTopNavBar = true;
            $rootScope.subtopnavbar = {
                tabId: 0,
                navBack: {
                    uri: 'app.booking',
                    title: 'Booking Overview'
                },
                items: [
                    {title: 'Details', iconClass: 'icon-profile'},
                    {title: 'Menu', iconClass: 'icon-manage-apps'},
                    {title: 'Settings', iconClass: 'icon-manage-apps'}
                ]
            };
        }

        /**
         * @name configure_layout
         * @desc Layout configuration
         * @memberOf app.booking.BookingDetailCtrl
         */
        function configure_layout() {
            update_sub_top_nav();

            $rootScope.$broadcast('topnavbar.update', {
                title: BookingsModel.current_business.name ? BookingsModel.current_business.name : 'BOOKING DETAILS'
            });

            $rootScope.$broadcast('subtopnavbar.update', {
                uri: 'app.booking',
                title: 'Booking Overview'
            });

            NotificationService.configure({subnavbar: true});
        }

        /**
         * @name unselect
         * @desc Unselects Booking Object item
         * @memberOf app.booking.BookingDetailCtrl
         */
        function unselect() {
            $rootScope.$broadcast('booking_object.preselect', {
                item: null
            });
            $rootScope.$broadcast('booking_object.uselectItem');
        }
    }
})();
