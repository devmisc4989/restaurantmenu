/**
 * MenusModel
 * @namespace app.menu.services
 */
(function () {
    'use strict';

    angular
        .module('app.menu.services')
        .factory('MenusModel', MenusModel);

    MenusModel.$inject = [];

    /**
     * @namespace MenusModel
     * @returns {Factory}
     */
    function MenusModel() {

        var MenusModel = {
            constants: {
                PUBLISHED: 'published',
                DRAFT: 'drafts',
                ITEM: 'item',
                FIXED_PRICE_ITEM: 'fixedPrice',
                CATEGORY: 'group',
                SUBCATEGORY: 'item_group',
                NOTE: 'note',
                PRICE: 'price',
                OPTION: 'option',
                SELECTION: 'selection'
            },
            option_types: [
                {
                    id: 1,
                    name: 'addition'
                },
                {
                    id: 2,
                    name: 'choice'
                },
                {
                    id: 3,
                    name: 'combo'
                }
            ],
            feedback: {
                retrieve_menu_published_fail: 'We couldn\'t retrieve list of your published menus, please check your internet connection',
                retrieve_menu_drafts_fail: 'We couldn\'t retrieve list of your menu drafts, please check your internet connection',
                destroy_menu_success: 'Menu has been deleted successfully',
                destroy_menu_fail: 'Menu has not been deleted, please check your internet connection',
                update_menu_list_success: 'Menu list has been updated successfully',
                update_menu_list_fail: 'Menu list has not been updated, please check your internet connection',
                get_businesses_fail: 'We couldn\'t retrieve list of your businesses, please check your internet connection',
                add_success: 'Menu has been created successfully',
                add_fail: 'Menu has not been created, please check your internet connection',
                save_success: 'Menu has been saved successfully',
                save_fail: 'Menu has not been saved, please check your internet connection',
                publish_success: 'Menu has been published successfully',
                publish_fail: 'Menu has not been published, please check your internet connection',
                unpublish_success: 'Menu has been unpublished successfully',
                unpublish_fail: 'Menu has not been unpublished, please check your internet connection',
                update_success: 'Menu has been updated successfully',
                update_fail: 'Menu has not been updated, please check your internet connection'
            },
            htmls: {
                item: "<item menu-data='data'></item>",
                item_within_category: "<item class='within-category' menu-data='data'></item>",
                item_within_subcategory: "<item class='within-subcategory' menu-data='data'></item>",
                category: "<menu-category menu-data='data'></menu-category>",
                category_header: "<menu-category-header menu-data='menuData'></menu-category-header>",
                subcategory: "<menu-subcategory menu-data='data'></menu-subcategory>",
                subcategory_header: "<menu-subcategory-header menu-data='menuData'></menu-subcategory-header>"
            },
            selected_menu: {},
            currently_selected_item: {},
            published: {
                menus: []
            },
            menus: [],
            published_menus: [],
            modified_items: [],
            current_business: '',
            current_published_menus_id: ''
        };

        return MenusModel;
    }
})();