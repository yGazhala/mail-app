'use strict';
angular
    .module('contacts')
    .component('userEditForm', {
        bindings: {
            selectedUser: '<',
            updateUser: '&'
        },
        templateUrl: 'contacts/user-edit-form.html'
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('edit-form', {
                parent: 'user-card',
                url: '/edit-form',
                template: `<user-edit-form selected-user="$ctrl.selectedUser"
                                update-user="$ctrl.updateUser({user: user})"
                                    ></user-edit-form>`
            })
    });