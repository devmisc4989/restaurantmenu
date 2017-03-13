/**
 * MenuObjectBuilder
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('MenuObjectBuilder', MenuObjectBuilder);

    MenuObjectBuilder.$inject = ['$rootScope', 'MenusModel', 'GenericItemsFactory'];

    /**
     * @namespace MenuObjectBuilder
     * @returns {MenuObjectBuilder}
     */
    function MenuObjectBuilder($rootScope, MenusModel, GenericItemsFactory) {

        var MenuObjectBuilder = {
            calculate_position_for_item: calculate_position_for_item,
            delete_item: delete_item,
            find_item_position: find_item_position,
            calculate_position: calculate_position,
            calculate_position_for_category: calculate_position_for_category,
            calculate_position_for_subcategory: calculate_position_for_subcategory,
            add_item: add_item
        };

        return MenuObjectBuilder;

        ////////////////////

        /**
         * @name insert_item
         * @desc Inserts item at specific position in Menu Object tree
         * @memberOf app.menu.MenuObjectBuilder
         */
        function insert_item(position, type, items) {

            var generic_items_factory = new GenericItemsFactory();
            var new_item = generic_items_factory.create_item(type);

            if (!position) { /* Currently selected item is a menu header */
                items.insert(0, [new_item]);
            }
            else if (position.level_2 != null) {
                items[position.level_0].items[position.level_1].items.insert(position.level_2, [new_item]);
            }
            else if (position.level_1 != null) {
                items[position.level_0].items.insert(position.level_1, [new_item]);
            }
            else if (position.level_0 != null) {
                items.insert(position.level_0, [new_item]);
            }
        }

        /**
         * @name calculate_position
         * @desc Calculates position of the generic item in Menu Object
         * @memberOf app.menu.MenuObjectBuilder
         */
        function calculate_position(type, position, selected_item_type) {
            if (type == MenusModel.constants.CATEGORY) {
                return calculate_position_for_category(position);
            }
            else if (type == MenusModel.constants.SUBCATEGORY) {
                return calculate_position_for_subcategory(position);
            }
            else if (type == MenusModel.constants.ITEM) {
                return calculate_position_for_item(position, selected_item_type);
            }
            else if (type == MenusModel.constants.NOTE) {
                return calculate_position_for_item(position, selected_item_type);
            }
        }

        /**
         * @name calculate_position_for_category
         * @desc Calculates position of the category in Menu Object
         * @memberOf app.menu.MenuObjectBuilder
         */
        function calculate_position_for_category(position) {
            return {
                level_0: position.level_0 + 1,
                level_1: null,
                level_2: null
            };
        }

        /**
         * @name calculate_position_for_subcategory
         * @desc Calculates position of the subcategory in Menu Object
         * @memberOf app.menu.MenuObjectBuilder
         */
        function calculate_position_for_subcategory(position) {
            return {
                level_0: position.level_0,
                level_1: 0,
                level_2: null
            };
        }

        /**
         * @name find_item_position
         * @desc Returns the position of the item in the Menu Object or 'false' if the item was not found
         * @memberOf app.menu.MenuObjectBuilder
         */
        function find_item_position(item, items) {
            var position = {
                level_0: null,
                level_1: null,
                level_2: null
            };

            var found = _.some(items, function (item_, index_, ary_) {
                position.level_0 = index_;
                if (item == item_) {
                    position.level_1 = null;
                    position.level_2 = null;
                    return true;
                }
                else {
                    return _.some(item_.items, function (item__, index__, ary__) {
                        position.level_1 = index__;
                        if (item == item__) {
                            position.level_2 = null;
                            return true;
                        }
                        else {
                            return _.some(item__.items, function (item___, index___, ary___) {
                                position.level_2 = index___;
                                return item == item___;
                            });
                        }
                    });
                }
            });

            //console.log('Position: ', position);
            //console.log('Found: ', found);

            if (found) {
                return position;
            } else {
                return false;
            }
        }


        /**
         * @name delete_item
         * @desc Deletes selected menu object item
         * @memberOf app.menu.MenuObjectBuilder
         */
        function delete_item(item, items) {
            var index = delete_from_1_level(item);
            if (index < 0) {
                index = delete_from_2_level(item);
                if (index < 0) {
                    delete_from_3_level(item);
                }
            }

            /**
             * @name delete_from_1_level
             * @desc Deletes item from 1 level of Menu Object structure
             * @memberOf app.menu.MenuObjectBuilder
             */
            function delete_from_1_level(item) {
                index = _.indexOf(items, item);
                if (index > -1) {
                    items.splice(index, 1);
                }
                return index;
            }

            /**
             * @name delete_from_2_level
             * @desc Deletes item from 2 level of Menu Object structure
             * @memberOf app.menu.MenuObjectBuilder
             */
            function delete_from_2_level(item) {
                _.find(items, function (item_) {
                    index = _.findIndex(item_.items, function (item__) {
                        return item == item__;
                    });
                    if (index > -1) {
                        item_.items.splice(index, 1);
                    }
                });
                return index;
            }

            /**
             * @name delete_from_3_level
             * @desc Deletes item from 2 level of Menu Object structure
             * @memberOf app.menu.MenuObjectBuilder
             */
            function delete_from_3_level(item) {
                _.find(items, function (item_) {
                    _.find(item_.items, function (item__) {
                        index = _.findIndex(item__.items, function (item___) {
                            return item == item___;
                        });
                        if (index > -1) {
                            item__.items.splice(index, 1);
                        }
                    });
                });
            }
        }

        /**
         * @name calculate_position_for_item
         * @desc Calculates position of the item in Menu Object
         * @memberOf app.menu.MenuObjectBuilder
         */
        function calculate_position_for_item(position, selected_item_type) {
            var level_0, level_1, level_2 = null;

            if (position.level_2 != null) {
                level_2 = position.level_2 + 1;//(position.level_2 > 0) ? (position.level_2 + 1) : 0;
                level_1 = position.level_1;
                level_0 = position.level_0;
            }
            else if (position.level_1 != null) {
                if (selected_item_type == MenusModel.constants.SUBCATEGORY) {
                    level_2 = 0;
                    level_1 = position.level_1;
                    level_0 = position.level_0;
                }
                else {
                    level_2 = null;
                    level_1 = position.level_1 + 1;
                    level_0 = position.level_0;
                }
            }
            else if (position.level_0 != null) {
                if (selected_item_type == MenusModel.constants.CATEGORY) {
                    level_2 = null;
                    level_1 = 0;
                    level_0 = position.level_0;
                }
                else {
                    level_2 = null;
                    level_1 = null;
                    level_0 = position.level_0 + 1;
                }
            }
            return {
                level_0: level_0,
                level_1: level_1,
                level_2: level_2
            };
        }

        /**
         * @name add_item
         * @desc Adds item of certain type
         * @memberOf app.menu.MenuObjectBuilder
         */
        function add_item(type, items) {
            var position = find_item_position(MenusModel.currently_selected_item, items);

            if (position) {
                var new_position = calculate_position(type, position, MenusModel.currently_selected_item.type);
                insert_item(new_position, type, items);
            }

            else {
                insert_item(position, type, items);
            }
        }
    }
})();