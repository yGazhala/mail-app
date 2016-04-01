"use strict";

function ContactsListController(ContactsService, PageMaskService) {

    ContactsService.getAll().then((contacts) => {
        this.contacts = contacts;
    });

    this.togglePageMask = function() {
        PageMaskService.toggle();
    };

    this.selectedUser = null;
    this.selectUser = function(user) {
        this.selectedUser = user;
    };

    this.userCard = null;
    this.isUserSelected = false;
    this.isAddUserFormOpened = false;

    this.showUserCard = function(userCard) {
        this.isUserSelected = true;
        this.userCard = userCard;
    };

    this.backToContacts = function() {
        this.onClosePageMask();
        this.userCard = null;
        this.isUserSelected = false;
        this.isAddUserFormOpened = false;
    };

    this.openAddUserForm = function() {
        this.onOpenPageMask();
        this.isAddUserFormOpened = true;
    };

    this.newUserCard = null;

    this.addNewUser = function(newUser) {

        this.newUserCard = newUser;

        if (this.newUserCard) {
            ContactsService.addUser(this.newUserCard)
                .then((newUserCard) => {
                    this.contacts.push(newUserCard);
                    this.newUserCard = null;
                })
        }
    };

    this.removeUser = function (user) {
        ContactsService.removeUser(user)
            .then(() => {
                this.contacts.splice(this.contacts.indexOf(user), 1);
            });
    };

    this.isUserEditFormOpened = false;

    this.toggleUserEditForm = function() {
        this.onTogglePageMask();
        this.isUserEditFormOpened = !this.isUserEditFormOpened;
    };

    this.updateUser = function(user) {
        ContactsService.updateUser(user);
    }
}
