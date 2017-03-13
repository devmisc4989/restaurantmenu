/**
 * BookingsModel
 * @namespace app.booking.services
 */
(function () {
    'use strict';

    angular
        .module('app.booking.services')
        .factory('BookingsModel', BookingsModel);

    BookingsModel.$inject = [];

    /**
     * @namespace BookingsModel
     * @returns {Factory}
     */
    function BookingsModel() {

        var BookingsModel = {
            constants: {
                PENDING:    'pending',
                PROPOSAL:   'proposal',
                TENTATIVE:  'tentative',
                REVISION:   'revision',
                CONFIRMED:  'confirmed',
                FEEDBACK:   'feedback',
                CLOSED:     'closed'
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
                get_booking_types_fail: 'We couldn\'t retrieve list of your booking ctypes, please check your internet connection',
                get_contacts_fail: 'We couldn\'t retrieve list of your business contacts, please check your internet connection',
                retrieve_booking_drafts_fail: 'We couldn\'t retrieve list of your booking drafts, please check your internet connection',
                destroy_booking_success: 'Book has been deleted successfully',
                destroy_booking_fail: 'Book has not been deleted, please check your internet connection',
                update_contact_success: 'Contact of Booking has been updated successfully',
                update_contact_fail: 'Contact of Booking has not been updated, please check your internet connection',
                update_date_success: 'Date of Booking has been updated successfully',
                update_date_fail: 'Date of Booking has not been updated, please check your internet connection',
                update_count_success: 'Number of guests has been updated successfully',
                update_count_fail: 'Number of guests has not been updated, please check your internet connection',
                update_note_success: 'Note of booking has been updated successfully',
                update_note_fail: 'Note of booking has not been updated, please check your internet connection',
                update_booking_list_success: 'Book list has been updated successfully',
                update_booking_list_fail: 'Book list has not been updated, please check your internet connection',
                update_elem_success: 'Element of Booking has been updated successfully',
                update_elem_fail: 'Element of Booking has not been updated, please check your internet connection',
                get_businesses_fail: 'We couldn\'t retrieve list of your businesses, please check your internet connection',
                add_success: 'Book has been created successfully',
                add_fail: 'Book has not been created, please check your internet connection',
                add_comment_success: 'Comment has been sent successfully',
                add_comment_fail: 'Comment has not been sent, please check your internet connection',
                confirm_success: 'Booking has been accepted successfully',
                confirm_fail: 'Booking has not been accepted, please check your internet connection',
                decline_success: 'Booking has been declined successfully',
                decline_fail: 'Booking has not been declined, please check your internet connection',
                close_success: 'Booking has been closed successfully',
                close_fail: 'Booking has not been closed, please check your internet connection',
                sendproposal_success: 'Booking has been sent proposal successfully',
                sendproposal_fail: 'Booking has not been sent proposal, please check your internet connection',
                followuptentative_success: 'Booking has been followed up tentative successfully',
                followuptentative_fail: 'Booking has not been followed up tentative, please check your internet connection',
                followupfeedback_success: 'Booking has been followed up feedback successfully',
                followupfeedback_fail: 'Booking has not been followed up feedback, please check your internet connection',
                save_success: 'Book has been saved successfully',
                save_fail: 'Book has not been saved, please check your internet connection',
                publish_success: 'Book has been pubbaqwertyu122131808977iipppxncdjflsd34543bnlished successfully',
                publish_fail: 'Book has not been published, please check your internet connection'
            },
            htmls: {
                item: "<item booking-data='data'></item>"
            },
            selected_booking: {},
            currently_selected_item: {},
            bookings: [],
            current_business: ''
        };

        return BookingsModel;
    }
})();