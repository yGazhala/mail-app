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