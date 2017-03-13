(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingGuestBoxCtrl', BookingGuestBoxCtrl);

    BookingGuestBoxCtrl.$inject = [
        '$rootScope',
        '$scope',
        'NotificationService',
        'BookingsModel',
        'BusinessContactService',
        'BookingService',
        '$q',
        '$timeout'
    ];

    function BookingGuestBoxCtrl($rootScope,
                                   $scope,
                                   NotificationService,
                                   BookingsModel,
                                   BusinessContactService,
                                   BookingService,
                                   $q,
                                   $timeout) {

        var vm = this;

        vm.current_business     = BookingsModel.current_business;
        vm.update_guest         = update_guest;

        vm.current_contact      = {};
        vm.selected_contact     = '';
        vm.search_contact_text  = '';
        vm.search_text_change   = search_text_change;
        vm.selected_item_change = selected_item_change;
        vm.query_search         = query_search;
        vm.contacts             = {};

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingGuestBoxCtrl
         */
        function activate() {
            vm.current_contact = BookingsModel.selected_booking.contact;
            if(vm.current_contact){
                vm.selected_contact = vm.current_contact.name;
                load_contacts_all();                
            }
        }

        function update_guest(){
            var action_url = BookingsModel.selected_booking.id;
            var request = {contact: vm.selected_contact};
            BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
            function success_fn(data, status, headers, config) {
                NotificationService.give_success_feedback(BookingsModel.feedback.update_contact_success);
            }

            function error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.update_contact_fail);
            }
        }

        function query_search (query) {
          var results = query ? vm.contacts.filter( createFilterFor(query) ) : vm.contacts;
          var deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        }

        function search_text_change(text) {
            vm.current_contact.name = text;
        }

        function selected_item_change(item) {            
            if(item){
                vm.current_contact.email = item.email;
                vm.current_contact.phone = item.phone;                            
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
