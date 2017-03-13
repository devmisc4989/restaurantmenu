angular.module('menucloud.services')
    .component('notificationContainer', {
        templateUrl: '/app/views/partials/notification-container.html',
        controller: notificationContainerController,
        controllerAs: 'notificationContainerCtrl'
    });

notificationContainerController.$inject = [
    'ToastService'
];

function notificationContainerController (ToastService) {
    var notificationContainerCtrl = this;
    notificationContainerCtrl.removeToast = removeToast;
    notificationContainerCtrl.toasts = [];
    activate();

    function activate () {
        notificationContainerCtrl.toasts = ToastService.getRecentToasts();
    }

    function removeToast(toast) {
        notificationContainerCtrl.toasts.splice(_.findIndex(notificationContainerCtrl.toasts, function (n) {
            return n.id == toast.id;
        }), 1);
    }
}