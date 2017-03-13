(function() {
    'use strict';

    angular
        .module('menucloud.services')
        .service('SocketService', SocketService);

    SocketService.$inject = [
        'RestFactory',
        'ToastService'
    ];

    function SocketService(RestFactory, ToastService) {
        var model_name = 'notification';
        var Service = function(){
            RestFactory.apply(this,arguments)
        };
        var Serviceinstance = new Service(model_name);
        Serviceinstance.init = init;

        function init () {
            //Need to pull from base vars
            var socket = io.connect('http://0.0.0.0:1337');
            if (!socket.listeningToNotifications) {
                socket.listeningToNotifications = true;
                socket.on('toast', function onServerSentEvent (msg) {
                    ToastService.socketToast(msg);
                });
            }
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