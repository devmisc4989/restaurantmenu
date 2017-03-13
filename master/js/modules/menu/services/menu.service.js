/**
 * MenuService
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .service('MenuService', MenuService);

    MenuService.$inject = [
        '$http',
        '$q',
        '$localStorage',
        'NotificationService',
        '$rootScope',
        'RestFactory',
        'MenusModel'
    ];

    function MenuService($http, $q, $localStorage, NotificationService, $rootScope, RestFactory, MenusModel) {

        var model_name = 'menu';

        var Service = function () {
            RestFactory.apply(this, arguments)
        };

        var MenuService = new Service(model_name);

        MenuService.denormalize = denormalize;
        MenuService.normalize = normalize;
        MenuService.denormalize_all = denormalize_all;
        MenuService.normalize_all = normalize_all;
        MenuService.save = save;

        /**
         * @name denormalize
         * @desc Converts the Menu Object to format accepted by the server
         * @memberOf app.menu.MenuService
         */
        function denormalize(menu) {

            var group_end = {
                "type": "group_end",
                "name": "",
                "description": ""
            };

            var item_group_end = {
                "type": "item_group_end",
                "name": "",
                "description": ""
            };


            for (var i = 0; i < menu.items.length; i++) {
                if (menu.items[i].type == 'group') {
                    menu.items.insert(i + 1, menu.items[i].items);
                    menu.items.insert(i + 1 + menu.items[i].items.length, [group_end]);
                    delete menu.items[i].items;
                }
            }

            for (i = 0; i < menu.items.length; i++) {
                if (menu.items[i].type == 'item_group') {
                    menu.items.insert(i + 1, menu.items[i].items);
                    menu.items.insert(i + 1 + menu.items[i].items.length, [item_group_end]);
                    delete menu.items[i].items;
                }
            }

            return menu;
        }

        /**
         * @name normalize
         * @desc Converts the Menu Object from format accepted by server to general one
         * @memberOf app.menu.MenuService
         * @author Vitaly Nikopolidi
         */
        function normalize(menu) {
            /*
             format menu items steps:
             1. defineGroups range (everything between "group" and "group_end")
             2. define items which is on top level but not inside "group"
             3. define item groups range "item_group" and "item_group_end"
             4. define items "item" which is not im group
             */
            var g_indexes = [];
            var group = {};

            // group start, end indexes
            _.each(menu.items, function (item, key, list) {
                if (item.type == 'group') {
                    group = {start: key};
                    g_indexes.push(group)
                }
                if (item.type == 'group_end') {
                    g_indexes[g_indexes.length - 1].end = key
                }
            });

            // collect group items into parent group element
            var top_lvl = menu.items;
            _.each(g_indexes, function (el, key, list) {
                // group_items
                top_lvl[el.start].items = top_lvl.slice(el.start + 1, el.end);
                for (var i = el.start + 1; i <= el.end; i++) {
                    top_lvl[i] = null
                }
            });

            // remove collected items from items array
            top_lvl = _.compact(top_lvl);

            // parse top level groups
            _.each(top_lvl, function (top_el, key, list) {
                // if element has items then its group
                if (top_el && top_el.items && top_el.items.length) {
                    var ig_indexes = [];
                    // collect nested item group range
                    _.each(top_el.items, function (item, index, list) {
                        if (item.type == 'item_group') ig_indexes.push({start: index});
                        if (item.type == 'item_group_end') ig_indexes[ig_indexes.length - 1].end = index
                    });
                    // put collected items to item_group
                    _.each(ig_indexes, function (el, key, list) {
                        top_el.items[el.start].items = top_el.items.slice(el.start + 1, el.end);
                        for (var i = el.start + 1; i <= el.end; i++) {
                            top_el.items[i] = null
                        }
                    });
                    top_el.items = _.compact(top_el.items);
                }
            });
            // console.log('toplvl: ', top_lvl)
            menu.items = top_lvl;

            return menu;
        }

        /**
         * @name denormalize_all
         * @memberOf app.menu.MenuService
         */
        function denormalize_all(items) {
            var denormalized_items = [];

            _.each(items, function (item) {
                denormalized_items.push(MenuService.denormalize(item));
            });
            return denormalized_items;
        }

        /**
         * @name normalize_all
         * @memberOf app.menu.MenuService
         */
        function normalize_all(items) {
            var normalized_items = [];

            _.each(items, function (item) {
                normalized_items.push(MenuService.normalize(item));
            });
            return normalized_items;
        }

        /**
         * @name save
         * @desc Saves menu object
         * @memberOf app.menu.MenuService
         */
        function save(menu, quiet) {
            var menu_object_denormalized = MenuService.denormalize(angular.copy(menu));

            return MenuService.update(menu_object_denormalized).then(find_success_fn, find_error_fn);

            function find_success_fn(data) {
                $rootScope.$broadcast('menu_object.changed', {
                    status: false
                });
                if (!quiet) {
                    NotificationService.give_success_feedback(MenusModel.feedback.save_success);
                }
            }

            function find_error_fn(data) {
                if (!quiet) {
                    NotificationService.give_error_feedback(MenusModel.feedback.save_fail);
                }
                console.log("err: ", data);
            }
        }

        Array.prototype.insert = function (index, array) {
            this.splice.apply(this, [index, 0].concat(array));
        };

        return MenuService;
    }
})();