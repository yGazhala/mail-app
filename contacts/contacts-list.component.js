"use strict";
angular
    .module('contacts')
    .component('contactsList', {
        bindings: {},
        templateUrl: 'contacts/contacts-list.html',
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
                // это можно переписать методом сплайс и индексОф
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