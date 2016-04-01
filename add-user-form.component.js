'use strict';

angular
    .module('mailApp')
    .component('addUserForm', {
        bindings: {
            addNewUser: '&',
            togglePageMask: '&'
        },
        template: `<ui-view>
                       <!-- when state will be: "contacts-list.add-user" -
                       add-user-form.html template will be here -->
                   </ui-view>`
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('add-user', {
                parent: 'contacts-list',
                url: '/add-user',
                templateUrl: 'add-user-form.html'
            })
    });
