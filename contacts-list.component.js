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
                template: '<contacts-list></contacts-list>'
            })
    });