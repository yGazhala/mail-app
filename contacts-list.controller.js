"use strict";

function ContactsListController(ContactsService, PageMaskService, $state) {

    ContactsService.getAll().then((contacts) => {
        this.contacts = contacts;
    });

    this.isContactsListAllowed = function() {
        return $state.is('contacts-list') || $state.is('add-user');
    };

    this.selectedUser = null;
    this.selectUser = function(user) {
        this.selectedUser = user;
    };

    // Зачем нам это свойство?
    this.newUserCard = null;

    this.addNewUser = function(newUser) {
        this.newUserCard = newUser;

        if (this.newUserCard) {
            ContactsService.addUser(this.newUserCard)
                .then((newUserCard) => {
                    this.contacts.push(newUserCard);
                    this.newUserCard = null;
                    PageMaskService.close();
                    $state.go('contacts-list');
                })
        }
    };

    this.removeUser = function (user) {
        ContactsService.removeUser(user)
            .then(() => {
                this.contacts.splice(this.contacts.indexOf(user), 1);
            });
    };

    this.updateUser = function(user) {
        ContactsService.updateUser(user);
    }
}
