(function () {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingFormContainerCtrl', BookingFormContainerCtrl);

    BookingFormContainerCtrl.$inject = [
        '$rootScope',
        '$scope',
        'BookingsModel'
    ];

    function BookingFormContainerCtrl($rootScope,
                                   $scope,
                                   BookingsModel) {

        var vm = this;

        vm.inputs = [];

        activate();

        ////////////////

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf app.booking.BookingFormContainerCtrl
         */
        function activate() {
          vm.inputs = BookingsModel.selected_booking.inputs;
          /*
          vm.inputs = 
          [
            {
              type: "header",
              label: "Subject",
              position: 0,
              value: "This is header title"
            },
            {
              type: "text",
              label: "What is your name?",
              position: 1,
              value: "Michael"
            },
            {
              type: "menu",
              position: 2,
              selections: [
                "58a3092ae677110400f3745f",
                "58a4c6cce1c6260400be2ddd",
              ],
              menus: [
                "58a3092ae677110400f3745f",
                "58a4c740e1c6260400be2dde"
              ]
            },
            {
              type: "quote",
              label: "Quotes",
              position: 3,
              quotes: [
                {quote: "Quote Description A", price: "10"},
                {quote: "Quote Description B", price: "20"},
                {quote: "Quote Description C", price: "30"}                
              ],
              hidden: []
            },
            {
              type: "textarea",
              position: 4,
              label: "Tell me your life story.",
              value: ""
            },
            {
              type: "number",
              position: 5,
              label: "Your age?",
              value: 5
            },
            {
              type: "dropdown",
              position: 6,
              label: "Favorite Company",
              value: "Apple",
              options: [
                "Microsoft",
                "Apple",
                "Google"
              ]
            },
            {
              type: "file",
              position: 7,
              label: "Upload Docs",
              value: "http://localhost:3011/"
            },
            {
              type: "checkbox",
              position: 8,
              label: "Select Options",
              value: ["Option 1", "Option 2333"],
              options: [
                "Option 1",
                "Option 2333",
                "Option 333"
              ]
            },
            {
              type: "radio",
              position: 9,
              label: "Select Options",
              value: "Option 2333",
              options: [
                "Option 1",
                "Option 2333",
                "Option 333"
              ]
            },
            {
              type: "list",
              label: "Title of list",
              position: 10,
              lists: [
                {list: "Element of List", position: 0},
                {list: "Element of List", position: 1},
                {list: "Element of List", position: 2},
              ]
            }
          ];
          BookingsModel.selected_booking.inputs = vm.inputs;
          */
        }
    }
})();
