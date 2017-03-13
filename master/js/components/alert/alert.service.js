/**
 * Alert
 * @namespace app.alert.services
 */
(function () {
    'use strict';

    angular
        .module('app.alert.services')
        .factory('Alert', Alert);

    Alert.$inject = ['$rootScope'];

    /**
     * @namespace Alert
     * @returns {Factory}
     */
    function Alert($rootScope) {

        var swal = window.swal;

        var Alert = {
            swal: function (arg1, arg2, arg3) {
                $rootScope.$evalAsync(function () {
                    if (typeof(arg2) === 'function') {
                        swal(arg1, function (isConfirm) {
                            $rootScope.$evalAsync(function () {
                                arg2(isConfirm);
                            });
                        }, arg3);
                    } else {
                        swal(arg1, arg2, arg3);
                    }
                });
            },
            confirm_deletion: function (item_name, callback_fn, callback_fn_params) {
                $rootScope.$evalAsync(function () {
                    swal({
                        text: get_modal_text(item_name),
                        showCancelButton: true,
                        confirmButtonText: "DELETE",
                        showLoaderOnConfirm: true,
                        customClass: 'md-menucloud-std-theme',
                        allowOutsideClick: true,
                        confirmButtonClass: 'btn1 md-raised md-primary md-button md-menucloud-std-theme md-ink-ripple',
                        cancelButtonClass: 'md-raised btn1 md-button md-menucloud-std-theme md-ink-ripple',
                        reverseButtons: true,
                        showCloseButton: true
                    }).then(
                        function () {
                            callback_fn(callback_fn_params);
                        },
                        function (dismiss) {
                        }
                    );

                });
            },
            success: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'success');
                });
            },
            error: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'error');
                });
            },
            warning: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'warning');
                });
            },
            info: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'info');
                });
            },
            showInputError: function (message) {
                $rootScope.$evalAsync(function () {
                    swal.showInputError(message);
                });
            },
            close: function () {
                $rootScope.$evalAsync(function () {
                    swal.close();
                });
            }
        };

        return Alert;
    }

    function get_modal_text(item_name) {
        var question = "ARE YOU SURE YOU WANT TO DELETE ";
        if (!item_name.length) {
            item_name = "THIS ITEM";
        }
        else {
            item_name = "'" + item_name + "'";
        }
        return question + item_name.toUpperCase() + "?"
    }
})();