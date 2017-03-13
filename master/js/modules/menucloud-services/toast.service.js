(function() {
    'use strict';

    angular
        .module('menucloud.services')
        .service('ToastService', ToastService);

    ToastService.$inject = [
        '$http'
        , '$mdToast'
        , 'RestFactory'
    ];

    function ToastService($http, $mdToast, RestFactory) {
        var model_name = 'notification';
        var Service = function(){
            RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);

        Serviceinstance.socketToast = socketToast;
        Serviceinstance.getRecentToasts = getRecentToasts;
        Serviceinstance.toastList = [];

        function socketToast(obj){
            obj.headline = obj.headline ? obj.headline : 'Notification';
            obj.subhead = obj.subhead ? obj.subhead : '';
            obj.id = new Date().getUTCMilliseconds();

            Serviceinstance.toastList.push(obj);

            $mdToast.show({
                hideDelay   : 3000,
                position    : 'top right',
                controller  : 'ToastCtrl',
                controllerAs: 'toastCtrl',
                locals: {
                    headline: obj.headline,
                    subhead: obj.subhead
                },
                templateUrl : "/app/views/partials/toast-template.html"
            });
        }

        function getRecentToasts() {
            return Serviceinstance.toastList;
        }

        /*********************************************************************************
         @GUIDE:
         */
        // custom method example (see ../components/factories/rest.factory for details)
        /*
         Serviceinstance.yourAction = yourAction

         function yourAction(id, body){
         var action = '/action/'+id

         // arguments: (method, action, body)
         // @method: 'get' || 'put' || 'post' || 'delete'
         // @action: '/someaction'
         // @body: Object @optional

         return Serviceinstance.customAction('put', action, body)
         }
         **********************************************************************************/

        return  Serviceinstance;

    }
})();