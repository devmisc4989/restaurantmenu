(function() {
    'use strict';

    angular
        .module('app.toaster')
        .service('ToasterService', ToasterService);

    ToasterService.$inject = ['toaster'];
    function ToasterService(toaster) {
      
      function popToast(data){
        if(!data.timeout) data.timeout = 5000
        if(!_.isString(data.body)){
          if(_.isObject(data.body)){
            if(data.body.invalidAttributes){
              var errMsg = ''
              _.each(data.body.invalidAttributes, function(value, key, list){
                _.each(value, function(message, key, list){
                  if(message && _.isString(message)) errMsg += message+"\n"
                });
              });
              if(errMsg) data.body = errMsg
            }else if(data.body.message){
              data.body = data.body.message
            }else if(data.body.error){
              data.body = data.body.error
            }
          }
        }
        toaster.pop(data)
      }
      function toastError(title,body,options){
        var data = {
          type: 'error'
          ,title: title || "Error"
          ,body: body || "Something went wrong"
        }
        if(options && _.isObject(options)) data = _.extend(_.omit(data, 'type', 'title', 'body'), options);
        popToast(data)
      }
      function toastSuccess(title,body,options){
        var data = {
          type: 'success'
          ,title: title || "Success"
          ,body: body || "Changed has been saved"
        }
        if(options && _.isObject(options)) data = _.extend(_.omit(data, 'type', 'title', 'body'), options);
        popToast(data)
      }
      function toastWarning(title,body,options){
        var data = {
          type: 'warning'
          ,title: title || "Warning"
          ,body: body || "Something important just happened"
        }
        if(options && _.isObject(options)) data = _.extend(_.omit(data, 'type', 'title', 'body'), options);
        popToast(data)
      }
      
      function toastInfo(title,body,options){
        var data = {
          type: 'info'
          ,title: title || "Info"
          ,body: body || "You need to know something"
        }
        if(options && _.isObject(options)) data = _.extend(_.omit(data, 'type', 'title', 'body'), options);
        popToast(data)
      }

      return {
        error: toastError
        ,success: toastSuccess
        ,warning: toastWarning
        ,info: toastInfo
      }
    }
})();