(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'whirl':              ['vendor/whirl/dist/whirl.css'],
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              [
              'vendor/fontawesome/css/font-awesome.min.css',
              'vendor/simple-line-icons/css/simple-line-icons.css'
            ],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
            'ui-select': ['vendor/ui-select/dist/select.css'],
            'toaster': [
              "vendor/AngularJS-Toaster/toaster.js"
              ,"vendor/AngularJS-Toaster/toaster.css"
            ],
            'material-design-icons':["vendor/material-design-icons/iconfont/material-icons.css"]
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                       'vendor/ngDialog/css/ngDialog.min.css',
                                                       'vendor/ngDialog/css/ngDialog-theme-default.min.css'] }
          ]
        });
})();
