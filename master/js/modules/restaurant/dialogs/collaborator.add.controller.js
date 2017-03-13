/**=========================================================
 * Component: business-list.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.restaurant')
        .controller('CollaboratorAddCtrl', CollaboratorAddCtrl);

    CollaboratorAddCtrl.$inject = [
        '$rootScope'
        , '$scope'
        , '$state'
        , 'BusinessService'
        , '$mdDialog'
        , 'restaurant'
    ];

    function CollaboratorAddCtrl($rootScope
        , $scope
        , $state
        , BusinessService
        , $mdDialog
        , restaurant) {
        var dialog = this;
        dialog.user = {};
        ///////////////////////////////////////
        function activate() {
            dialog.hide = function () {
                $mdDialog.hide();
            };
            dialog.cancel = function () {
                $mdDialog.cancel();
            };
            dialog.answer = function (answer) {
                if (dialog.dialogForm.$valid) {
                    dialog.disabled = true;

                    BusinessService.addUser(restaurant.id, dialog.user).then(
                        function (res) {
                            dialog.disabled = false;
                            $mdDialog.hide(res.data);
                        },
                        function (res) {
                            dialog.disabled = false;
                            console.log('err: ', res.data)
                        }
                    )
                } else {
                    console.log('invalid form')
                }

            };
        }

        activate()
    }

})();
