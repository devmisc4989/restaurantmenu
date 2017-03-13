(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

      $translateProvider.translations('en',{
          DIALOGS_ERROR: "Error",
          DIALOGS_ERROR_MSG: "An unknown error has occurred.",
          DIALOGS_CLOSE: "Close",
          DIALOGS_PLEASE_WAIT: "Please Wait",
          DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
          DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
          DIALOGS_PERCENT_COMPLETE: "% Complete",
          DIALOGS_NOTIFICATION: "Notification",
          DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
          DIALOGS_CONFIRMATION: "Confirmation",
          DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
          DIALOGS_OK: "OK",
          DIALOGS_YES: "Yes",
          DIALOGS_NO: "No"
      });
    }
})();