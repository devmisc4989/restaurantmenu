/**=========================================================
 * Component: toast.controller.js
 *
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('menucloud.services')
        .controller('ToastCtrl', ToastCtrl);

    ToastCtrl.$inject = [
        'headline',
        'subhead',
        '$mdToast'
    ];

    function ToastCtrl(headline, subhead, $mdToast) {
        var toastCtrl = this;
        toastCtrl.headline = headline;
        toastCtrl.subhead = subhead;

        toastCtrl.closeToast = function () {
            $mdToast.hide();
        }
    }

})();
