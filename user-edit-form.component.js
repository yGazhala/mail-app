'use strict';
angular
    .module('mailApp')
    .component('userEditForm', {
        bindings: {
            selectedUser: '<',
            updateUser: '&',
            togglePageMask: '&'
        },

        template: `<user-edit-form selected-user="$ctrl.selectedUser"
                        update-user="$ctrl.updateUser(user)"
                        toogle-page-mask="$ctrl.togglePageMask()"
                        ></user-edit-form>`
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('edit-form', {
                parent: 'user-card',
                url: '/edit-form',
                templateUrl: 'user-edit-form.html'
            })
    });