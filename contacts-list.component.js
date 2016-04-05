"use strict";
angular
    .module('mailApp')
    .component('contactsList', {
        bindings: {},
        templateUrl: 'contacts-list.html',
        controller: ContactsListController
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('contacts-list', {
                url: '/contacts-list',
                template: '<contacts-list></contacts-list>',
                controller: function(PageMaskService) {
                    PageMaskService.close(); // не срабатывает при возврате с адд юзер форм
                }
            })
    });

function ContactsListController(ContactsService, PageMaskService, $state) {

    ContactsService.getAll().then((contacts) => {
        this.contacts = contacts;
    });

    this.isContactsListAllowed = function() {
        return $state.is('contacts-list') || $state.is('add-user');
    };

    this.newUserCard = null; // Зачем нам это свойство?

    this.addNewUser = function(newUser) {
        this.newUserCard = newUser;

        if (this.newUserCard) {
            ContactsService.addUser(this.newUserCard)
                .then((newUserCard) => {
                    this.contacts.push(newUserCard);
                    this.newUserCard = null;
                    PageMaskService.close(); // костыль
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
        ContactsService.updateUser(user)
            // reloading contacts list
            .then(() => {
                ContactsService.getAll()
                    .then((contacts) => {
                        this.contacts = contacts;
                    });
            })
    }
}