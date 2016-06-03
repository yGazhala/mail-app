"use strict";
import template from './contacts-list.html';

let contactsListComponent = {
    bindings: {},
    template,
    controller: ContactsListController
};

/* @ngInject */
function ContactsListController(ContactsService, PageMaskService, NavStatusService, $state, $timeout) {
    NavStatusService.setStatus('Contacts');

    this.statusMessage = null;

    this.showStatusMessage = function(message) {
        this.statusMessage = message;

        // Hide the message after timeout
        $timeout(() => this.statusMessage = null, 5000);
    };

    ContactsService.getAll().then((contacts) => {
        this.contacts = contacts;
    });

    this.isContactsListAllowed = function() {

        return $state.is('contacts-list') || $state.is('add-user');
    };

    this.isMobileSearchFieldOpened = false;

    this.toggleMobileSearchField = function() {
        this.isMobileSearchFieldOpened = !this.isMobileSearchFieldOpened;
    };

    this.addNewUser = function(newUser) {
        ContactsService.addUser(newUser)
            // update contacts list
            .then((newUser) => {
                this.contacts.push(newUser);
                PageMaskService.close();
                this.showStatusMessage('The new contact has been created');
                $state.go('contacts-list');
            });

    };

    this.removeUser = function (user) {
        ContactsService.removeUser(user)
            .then(() => {
                this.contacts.splice(this.contacts.indexOf(user), 1);
                this.showStatusMessage('The contact has been removed');
            });
    };

    this.updateUser = function(user) {
        ContactsService.updateUser(user)
            // update contacts list
            .then(()=> {
                this.showStatusMessage('The contact has been updated');

                let max = this.contacts.length;
                for(let i = 0; i < max; i++) {
                   if (this.contacts[i].id === user.id) {
                       this.contacts[i] = user;
                       return;
                   }
                }
            });
    }
}

export default contactsListComponent;