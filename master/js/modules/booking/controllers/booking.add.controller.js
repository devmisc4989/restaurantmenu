(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingAddDialogCtrl', BookingAddDialogCtrl);

    BookingAddDialogCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        '$mdDialog',
        '$timeout',
        'NotificationService',
        'BookingService',
        'BookingTypeService',
        'BusinessContactService',
        'BookingsModel',
        '$q'
    ];

    function BookingAddDialogCtrl($rootScope,
                               $scope,
                               $state,
                               $mdDialog,
                               $timeout,
                               NotificationService,
                               BookingService,
                               BookingTypeService,
                               BusinessContactService,
                               BookingsModel,
                               $q) {

        var vm = this;

        vm.add_booking = add_booking;
        vm.cancel = cancel;
        vm.hide = hide;

        vm.current_business = BookingsModel.current_business;

        vm.contacts             = {};
        vm.query_search         = query_search;
        vm.selected_item_change = selected_item_change;
        vm.search_text_change   = search_text_change;
        vm.search_contact_text  = '';

        vm.booking_types = [];
        vm.selected_booking_type = '';
        vm.selected_date = '';
        vm.selected_time = '';
        vm.selected_contact = '';

        vm.booking = {
            booking_type: '',
            date: '',
            number_of_guests: '',
            contact: {
                name:  '',
                email: '',
                phone: ''
            },
            notes : ''
        };

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingAddDialogCtrl
         */
        function activate() {
            get_booking_types();
            load_contacts_all();
        }

        /**
         * @name add_booking
         * @desc Creates new booking object
         * @memberOf app.booking.BookingAddDialogCtrl
         */
        function add_booking() {
            if (vm.dialogForm.$valid) {
                vm.disabled = true;
                vm.booking.business = BookingsModel.current_business.id;
                vm.booking.booking_type = vm.selected_booking_type.id;

                var selected_date_value = new Date(vm.selected_date);
                var selected_time_value = new Date(vm.selected_time);
                selected_date_value.setHours(selected_time_value.getHours());
                selected_date_value.setMinutes(selected_time_value.getMinutes());
                
                vm.booking.date = new Date(vm.selected_date).toISOString();
                vm.booking.contact.name = vm.search_contact_text;

                BookingService.create(vm.booking).then(success_fn, error_fn);
            }

            function success_fn(data, status, headers, config) {
                $mdDialog.hide(data.data);
                vm.disabled = false;
                NotificationService.give_success_feedback(BookingsModel.feedback.add_success);
                $timeout(function() {
                    BookingsModel.selected_booking = data.data;
                }, 1000);
            }

            function error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.add_fail);
                vm.disabled = false;
                console.log("err: ", data);
            }
        }

        /**
         * @name hide
         * @memberOf app.booking.BookingAddDialogCtrl
         */
        function hide() {
            $mdDialog.hide();
        }

        /**
         * @name cancel
         * @memberOf app.booking.BookingAddDialogCtrl
         */
        function cancel() {
            $mdDialog.cancel();
        }

        /**
         * @name get_booking_types
         * @desc Retrieve booking type list
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function get_booking_types() {

            BookingTypeService.find({
                "where":{
                  "business": vm.current_business.id
                }
              }).then(find_success_fn, find_error_fn);

            /**
             * @name find_success_fna
             * @desc Update list array on view
             */
            function find_success_fn(data, status, headers, config) {
                vm.booking_types = data.data;
                select_initial_booking_types();
            }

            /**
             * @name find_error_fn
             * @desc Show snackbar with error
             */
            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                NotificationService.give_error_feedback(BookingsModel.feedback.get_booking_types_fail);
            }
        }

        /**
         * @name select_initial_booking_types
         * @desc Layout configuration
         * @memberOf app.booking.BookingOverviewCtrl
         */
        function select_initial_booking_types() {
            if (vm.booking_types.length) {
                vm.selected_booking_type = vm.booking_types[0];
            }
        }

        function query_search (query) {
          var results = query ? vm.contacts.filter( createFilterFor(query) ) : vm.contacts;
          var deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        }

        function search_text_change(text) {
        }

        function selected_item_change(item) {            
            if(item){
                vm.booking.contact.email = item.email;
                vm.booking.contact.phone = item.phone;                            
            }
        }

        function load_contacts_all() {
            var action_url = 'findByBusiness/' + vm.current_business.id;
            BusinessContactService.customAction('get', action_url, '').then(find_success_fn, find_error_fn);

            /**
             * @name find_success_fna
             * @desc Update list array on view
             */
            function find_success_fn(data, status, headers, config) {
                vm.contacts = data.data;
            }

            /**
             * @name find_error_fn
             * @desc Show snackbar with error
             */
            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
                NotificationService.give_error_feedback(BookingsModel.feedback.get_contacts_fail);
            }
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(item) {
            return (item.name.toLowerCase().indexOf(lowercaseQuery) === 0);
          };

        }        

    }
})();
