'use strict';
angular
    .module('mailApp')
    .component('userCard', {
        bindings: {
            updateUser: '&'
        },
        templateUrl: 'user-card.html',
        controller: UserCardController
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('user-card', {
                parent: 'contacts-list',
                url: '/:userId',
                template: '<user-card update-user="$ctrl.updateUser(user)"></user-card>'
            })
    });

function UserCardController($stateParams, ContactsService, $state) {
    ContactsService.getOne($stateParams.userId)
        .then((user) => this.selectedUser = user);

    this.isUserCardAllowed = function() {
        return $state.is('user-card');
    }
}