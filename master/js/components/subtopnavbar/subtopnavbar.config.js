(function() {
    'use strict';

    angular
        .module('app.subtopnavbar')
        .config(subtopnavbarConfig);

    subtopnavbarConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function subtopnavbarConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

        var subtopnavbar = angular.module('app.subtopnavbar');
        // registering components after bootstrap
        subtopnavbar.controller = $controllerProvider.register;
        subtopnavbar.directive  = $compileProvider.directive;
        subtopnavbar.filter     = $filterProvider.register;
        subtopnavbar.factory    = $provide.factory;
        subtopnavbar.service    = $provide.service;
        subtopnavbar.constant   = $provide.constant;
        subtopnavbar.value      = $provide.value;
        // Disables animation on items with class .ng-no-animation

        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();