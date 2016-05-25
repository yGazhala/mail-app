"use strict";
import template from './contacts-list.html';

let contactsListComponent = {
    bindings: {},
    template,
    controller: ContactsListController
};

function ContactsListController(ContactsService, PageMaskService, NavStatusService, $state) {
    NavStatusService.setStatus('Contacts');

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
            .then((newUser) => {
                // update contacts list
                this.contacts.push(newUser);
                PageMaskService.close(); // костыль
                $state.go('contacts-list');
            });

    };

    this.removeUser = function (user) {
        ContactsService.removeUser(user)
            .then(() => {
                this.contacts.splice(this.contacts.indexOf(user), 1);
            });
    };

    this.updateUser = function(user) {
        ContactsService.updateUser(user)
            // update contacts list
            .then(()=> {
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