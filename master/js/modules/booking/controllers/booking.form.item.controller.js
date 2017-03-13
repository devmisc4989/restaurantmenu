(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingFormItemCtrl', BookingFormItemCtrl);

    BookingFormItemCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        '$timeout',
        'NotificationService',
        'BookingsModel',
        'BookingService',
        'MenuService'
    ];

    function BookingFormItemCtrl($rootScope,
                                   $scope,
                                   $q,
                                   $timeout,
                                   NotificationService,
                                   BookingsModel,
                                   BookingService,
                                   MenuService) {

        var vm      = this;
        vm.exists   = exists;
        vm.toggle   = toggle;
        vm.upload   = upload;
        vm.save_value = save_value;
        vm.save_with_value = save_with_value;
        
        vm.delete_list = delete_list;
        vm.add_list    = add_list;

        vm.delete_quote = delete_quote;
        vm.add_quote    = add_quote;

        vm.delete_menu = delete_menu;
        vm.add_menu    = add_menu;
        vm.add_new_menu       = add_new_menu;
        vm.show_add_menu      = show_add_menu;
        vm.add_select_to_menu = add_select_to_menu;
        vm.show_menu_line     = false;

        vm.selected_list = '';

        vm.selected_quote_item  = '';
        vm.selected_quote_price = '';

        vm.add_menu_label       = 'ADD A MENU';
        vm.selected_menu        = '';
        vm.search_menu_text     = '';
        vm.search_text_change   = search_text_change;
        vm.selected_item_change = selected_item_change;
        vm.query_search         = query_search;
        vm.menu_datas           = [];
        vm.selection_datas      = [];
        vm.menu_list            = [];

        vm.fixed_menus          = [];
        vm.is_hidden_item       = is_hidden_item;
        vm.hidden_quote         = hidden_quote;
        vm.delete_quote         = delete_quote;
        vm.add_quote            = add_quote;

        vm.selected_booking = {};
        vm.radio_value = '';

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingFormItemCtrl
         */
        function activate() {
            vm.selected_booking = BookingsModel.selected_booking;
            switch($scope.item.type){
            case 'radio':
                vm.radio_value = $scope.item.value;
                break;
            case 'menu':
                get_menus_detail();
                get_selections_detail();
                get_menu_list();

                break;
            case 'quote':
                $scope.$on('booking_quote.fixed', function (event, data) {
                    vm.fixed_menus = data.item;
                });
                break;
            }
        }

        function hidden_quote(item){
            var pos = -1;
            var index = 0;
            angular.forEach($scope.item.hidden, function(elem) {
                if(item.id == elem){
                    pos = index;
                }
                index++;
            });

            if(pos == -1){
                $scope.item.hidden.push(item.id);
            } else {
                $scope.item.hidden.splice(pos, 1);
            }

            update_quotes();
        }

        function add_quote(){
            var item = {
                quote: vm.selected_quote_item,
                price: selected_quote_price
            };
            $scope.item.quotes.push(item);
            update_quotes();
        }

        function delete_quote(index){
            $scope.item.quotes.splice(pos, 1);
            update_quotes();
        }

        function update_quotes(){
            var inputs = vm.selected_booking.inputs;

            inputs[$scope.item.position] = $scope.item;

            update_booking_inputs(inputs);
        }

        function is_hidden_item(item){
            var result = false;
            angular.forEach($scope.item.hidden, function(elem) {
                if(item.id == elem)
                    result = true;
            });

            return result;
        }

        function send_fixed_menu_data(){
            var fixed_data = [];            
            /***********Simulate API result** for fixed price*******************/
            angular.forEach(vm.menu_datas, function(elem) {                        
                if(!elem.fixed_price){                            
                    var menu_elem = {
                        id: elem.id,
                        fixed_price: elem.fixed_price,
                        scope: elem.scope,
                        title: elem.title,
                        price: 5
                        //price: elem.inputs.fixed_price.amount
                    };
                    fixed_data.push(menu_elem);
                }
            });                        
            
            $rootScope.$broadcast('booking_quote.fixed', {
                item: fixed_data
            });                                        
        }

        function get_menu_list(){
            MenuService.find({where: {business: BookingsModel.current_business.id, scope: 'global'}}).then(find_success_fn, find_error_fn);
            function find_success_fn(data, status, headers, config) {
                vm.menu_list = data.data;                
            }

            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
            }
        }

        function get_menus_detail(){
            angular.forEach($scope.item.menus, function(item) {
                MenuService.find({where: {id: item}}).then(find_success_fn, find_error_fn);
            });

            function find_success_fn(data, status, headers, config) {
                angular.forEach(data.data, function(elem) {
                    var menu_elem = {
                        id: elem.id,
                        fixed_price: elem.fixed_price,
                        scope: elem.scope,
                        title: elem.title                        
                    };
                    vm.menu_datas.push(menu_elem);
                });
                send_fixed_menu_data();
            }

            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
            }
        }

        function get_selections_detail(){
            angular.forEach($scope.item.selections, function(item) {
                MenuService.find({where: {id: item}}).then(find_success_fn, find_error_fn);
            });

            function find_success_fn(data, status, headers, config) {
                angular.forEach(data.data, function(elem) {
                    var menu_elem = {
                        id: elem.id,
                        fixed_price: elem.fixed_price,
                        scope: elem.scope,
                        title: elem.title                        
                    };
                    vm.selection_datas.push(menu_elem);
                });                        
            }

            function find_error_fn(data, status, headers, config) {
                console.log("err: ", data);
            }
        }

        function query_search (query) {
          var results = query ? vm.menu_list.filter( createFilterFor(query) ) : vm.menu_list;
          var deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        }

        function search_text_change(text) {
            if(!vm.selected_menu){
                vm.add_menu_label = 'ADD ' + text + ' AS NEW MENU';
            } else {
                vm.add_menu_label = 'ADD A MENU';
            }
        }

        function selected_item_change(item) {
            vm.add_menu_label = 'ADD A MENU';
            add_menu();
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(item) {
            return (item.title.toLowerCase().indexOf(lowercaseQuery) === 0);
          };

        }        

        function save_value(){
            var inputs = vm.selected_booking.inputs;
            inputs[$scope.item.position].value = $scope.item.value;

            update_booking_inputs(inputs);
        }

        function save_with_value(value){
            var inputs = vm.selected_booking.inputs;
            inputs[$scope.item.position].value = value;

            update_booking_inputs(inputs);            
        }

        function delete_menu(id){
            var pos = 0;
            var index = 0;
            angular.forEach(vm.menu_datas, function(elem) {
                if(elem.id == id)
                    pos = index;
                index++;
            });

            vm.menu_datas.splice(pos, 1);
            update_menus();
        }

        function show_add_menu(){
            vm.show_menu_line = true;
        }

        function add_new_menu(){
            add_menu();
        }

        function add_menu(){
            var clone_item = {};
            if(vm.selected_menu){                
                clone_item = {
                    title: vm.selected_menu.title,
                    business: BookingsModel.current_business.id,
                    parent_menu: vm.selected_menu.id,
                    scope: 'booking'                    
                };                
            } else {
                clone_item = {
                    title: vm.search_menu_text,
                    business: BookingsModel.current_business.id,
                    scope: 'booking'
                };
            }
            //MenuService.create(clone_item).then(clone_success_fn, clone_error_fn);

            /***********Simulate API result*********************/
            if(vm.selected_menu){
                var result = { data : {
                    id: vm.selected_menu.id,
                    title: vm.selected_menu.title,
                    scope: 'booking',
                    fixed_price: false
                }
                };
                clone_success_fn(result, '', '', '');                
            }

            if(vm.selected_menu){            
                vm.selected_menu  = '';
            } else {
                vm.search_menu_text = '';
            }
        }

        function clone_success_fn(data, status, headers, config) {
            var item = data.data;
            var menu_elem = {
                id: item.id,
                fixed_price: item.fixed_price,
                scope: item.scope,
                title: item.title
            };
            vm.menu_datas.push(menu_elem);
            update_menus();

            NotificationService.give_success_feedback(BookingsModel.feedback.update_elem_success);
        }

        function clone_error_fn(data, status, headers, config) {
            NotificationService.give_error_feedback(BookingsModel.feedback.update_elem_fail);
        }                


        function update_menus(){
            var inputs = vm.selected_booking.inputs;

            inputs[$scope.item.position].menus = [];

            angular.forEach(vm.menu_datas, function(elem) {
                inputs[$scope.item.position].menus.push(elem.id);
            });                        

            update_booking_inputs(inputs);

            send_fixed_menu_data();
        }

        function add_select_to_menu(id){
            var selection_item = id ? vm.selection_datas.filter( createIdFilterForSelections(id) ) : vm.selection_datas;
            if(selection_item.length > 0){
                var clone_item = {
                    title: selection_item[0].title,
                    business: BookingsModel.current_business.id,
                    parent_menu: selection_item[0].id,
                    scope: 'booking'
                };
                //MenuService.create(clone_item).then(clone_success_fn, clone_error_fn);                

                /***********Simulate API result*********************/
                if(selection_item[0]){
                    var result = { data:{
                        id: selection_item[0].id,
                        title: selection_item[0].title,
                        scope: 'booking',
                        fixed_price: false
                    }
                    };
                    clone_success_fn(result, '', '', '');                
                }
            }
        }

        function createIdFilterForSelections(id) {
          return function filterFn(item) {
            return (item.id == id);
          };

        }

        function delete_quote(pos){
            var inputs = vm.selected_booking.inputs;
            inputs[$scope.item.position].quotes.splice(pos, 1);

            for (var j=0; j < inputs[$scope.item.position].quotes.length; j++) {
                inputs[$scope.item.position].quotes[j].position = j;
            }

            update_booking_inputs(inputs);
        }

        function add_quote(){
            var inputs = vm.selected_booking.inputs;

            if (!inputs[$scope.item.position].quotes) {
                inputs[$scope.item.position].quotes = [];
            }

            inputs[$scope.item.position].quotes.push({
                quote: vm.selected_quote_item,
                price: vm.selected_quote_price,
                position: inputs[$scope.item.position].quotes.length
            });

            update_booking_inputs(inputs);

            vm.selected_quote_item  = '';
            vm.selected_quote_price = '';
        }

        function delete_list(pos){
            var inputs = vm.selected_booking.inputs;
            inputs[$scope.item.position].lists.splice(pos, 1);

            for (var j=0; j < inputs[$scope.item.position].lists.length; j++) {
                inputs[$scope.item.position].lists[j].position = j;
            }

            update_booking_inputs(inputs);
        }

        function add_list(){
            var inputs = vm.selected_booking.inputs;

            if (!inputs[$scope.item.position].lists) {
                inputs[$scope.item.position].lists = [];
            }

            inputs[$scope.item.position].lists.push({
                list: vm.selected_list,
                position: inputs[$scope.item.position].lists.length
            });

            update_booking_inputs(inputs);

            vm.selected_list = '';
        }

        function update_booking_inputs(req){
            var action_url = vm.selected_booking.id;
            var request = {inputs: req};
            BookingService.customAction('put', action_url, request).then(success_fn, error_fn);
            function success_fn(data, status, headers, config) {
                if($scope.item.type == 'radio')
                    vm.radio_value = $scope.item.value;
                NotificationService.give_success_feedback(BookingsModel.feedback.update_elem_success);
            }

            function error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.update_elem_fail);
            }
        }

        function upload(){
            var file = $("#fileInput")[0].files[0];
            var action_url = 'upload';            
            var request = new FormData();
            request.append('file', file);

            BookingService.upload(action_url, request).then(success_fn, error_fn);
            function success_fn(data, status, headers, config) {
                save_with_value(data.data);
                NotificationService.give_success_feedback(BookingsModel.feedback.update_elem_success);
            }

            function error_fn(data, status, headers, config) {
                NotificationService.give_error_feedback(BookingsModel.feedback.update_elem_fail);
            }
        }

        function exists(item, list){
            return list.indexOf(item) > -1;
        }

        function toggle(item, list){
            var idx = list.indexOf(item);
            if (idx > -1) {
              list.splice(idx, 1);
            }
            else {
              list.push(item);
            }            
        }
    }
})();
