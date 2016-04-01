'use strict';
angular
    .module('mailApp')
    .component('user-card', {
        bindings: {
            selectedUser: '<',
            updateUser: '&',
            togglePageMask: '&'
        },

        template: `<user-card selected-user="$ctrl.selectedUser"
                       update-user="$ctrl.updateUser(user)"
                       toggle-page-mask="$ctrl.togglePageMask()"
                       ></user-card>`
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('user-card', {
                parent: 'contacts-list',
                url: '/:userId',
                templateUrl: 'user-card.html'
            })
    });
