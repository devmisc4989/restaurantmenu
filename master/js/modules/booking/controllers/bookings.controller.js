(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingsCtrl', BookingsCtrl);

    BookingsCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        'Alert',
        'BookingService',
        'BookingsModel',
        'NotificationService'
    ];

    function BookingsCtrl($rootScope,
                       $scope,
                       $q,
                       Alert,
                       BookingService,
                       BookingsModel,
                       NotificationService) {

        var vm = this;

        vm.get_bookings = get_bookings;

        vm.items = [];
        vm.sort_options = {};
        vm.selected = null;

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingsCtrl
         */
        function activate() {

            $scope.$on('booking_list.add', function (event, data) {
                BookingsModel.bookings.push(update_booking_description(data.item));
                vm.items.sort(function(a,b){
                  return new Date(a.date) - new Date(b.date);
                }); 
            });

            $scope.$on('booking_list.update', function (event, data) {
                BookingsModel.current_business = data.business;
                get_bookings({where: {business: BookingsModel.current_business.id}});
            });

            $scope.$on('booking_list.filter', function (event, data) {
                get_bookings_by_filter(data.text);
            });

            $scope.$on('booking_list.destroy_booking', function (event, data) {
                open_delete_confirmation_dialog(data.item, data.type);                
            });

            $scope.$watch('vm.items', function () {
                $rootScope.$broadcast('booking_list.update_stats', {
                    item: vm.items
                });                            

                $rootScope.$broadcast('booking_list.booking_attention', {
                    item: vm.items
                });                            
            });            
        }

        /**
         * @name get_bookings_by_filter
         * @desc Retrieve booking list included text
         * @memberOf app.booking.BookingsCtrl
         */
        function get_bookings_by_filter(text){
            var results = text ? BookingsModel.bookings.filter( createFilterFor(text) ) : BookingsModel.bookings;
            vm.items = results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(item) {

            return (item.contact.name.toLowerCase().includes(lowercaseQuery));
          };

        }        

        function update_booking_description(item){
            var elem = item;
            switch(item.stage){
            case "pending":
                elem.description = "Last Activity booking pending and awaiting agent";
                break;
            case "proposal":
                elem.description = "Last Activity booking accepted and awaiting proposal";
                break;
            case "confirmed":
                elem.description = "Last Activity booking confirmed";
                break;
            case "feedback":
                elem.description = "Last Activity feedback email sent and awaiting client";
                break;
            }
            return elem;            
        }

        /**
         * @name get_bookings
         * @desc Retrieve booking list
         * @memberOf app.booking.BookingsCtrl
         */
        function get_bookings(query) {
            BookingService.find(query).then(bookings_success_fn, bookings_error_fn);

            /**
             * @name bookings_success_fn
             * @desc Update list array on view
             */
            function bookings_success_fn(data, status, headers, config) {
                BookingsModel.bookings = [];
                _.each(data.data, function (item) {
                    if(item.stage == 'closed' || (new Date(item.date) < new Date()))
                        return;
                    BookingsModel.bookings.push(update_booking_description(item));
                });
                vm.items = BookingsModel.bookings;
                vm.items.sort(function(a,b){
                  return new Date(a.date) - new Date(b.date);
                }); 
            }

            /**
             * @name bookings_error_fn
             * @desc Show snackbar with error
             */
            function bookings_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.retrieve_booking_drafts_fail);
                console.log("err: ", data);
            }

        }

        /**
         * @name remove_from_list_by_id
         * @desc Removes item from the currently displayed list
         * @returns {Array} of items without removed item
         */
        function remove_from_list_by_id(list, item) {
            var list_lenght = list.length;

            var new_list = _.reject(list, function (element) {
                return _.findWhere([item], {id: element.id});
            });

            var removed = list_lenght > new_list.length;

            return {new_list: new_list, removed: removed};
        }

        /**
         * @name destroy_booking
         * @desc Deletes selected booking from the currently displayed list and from the database
         * @memberOf app.booking.BookingsCtrl
         */
        function destroy_booking(params) {
            var item = params.item;

            var booking = item;
            var result = remove_from_list_by_id(vm.items, item);

            if (result.removed) {
                vm.items = result.new_list;
                BookingsModel.bookings = vm.items;
                return BookingService.destroy({id:item.id}).then(destroy_success_fn, destroy_error_fn);
            }

            /**
             * @name destroy_success_fn
             * @desc Update list array on view
             */
            function destroy_success_fn(data, status, headers, config) {
                NotificationService.give_success_feedback(BookingsModel.feedback.destroy_booking_success);
                console.log('removed: ', data.data);
            }

            /**
             * @name destroy_error_fn
             * @desc Show snackbar with error
             */
            function destroy_error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.destroy_booking_fail);
                vm.items.unshift(booking);
                console.log("err: ", data);
            }
        }

        /**
         * @name open_delete_confirmation_dialog
         * @memberOf app.booking.BookingsCtrl
         */
        function open_delete_confirmation_dialog(item, type) {
            var item_name = item.contact.name;
            var callback_fn = function (params) {
                destroy_booking(params);
            };
            var callback_fn_params = {item: item};

            Alert.confirm_deletion(item_name, callback_fn, callback_fn_params);
        }        
    }
})
();
