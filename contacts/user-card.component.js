'use strict';
angular
    .module('contacts')
    .component('userCard', {
        bindings: {
            updateUser: '&', // callback to parent contacts-list component
            selectedUser: '<' // get data from UserCardStateController
        },
        templateUrl: 'contacts/user-card.html',
        controller: UserCardController
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('user-card', {
                parent: 'contacts-list',
                url: '/:userId',
                template: `<user-card selected-user="stateCtrl.selectedUser"
                               update-user="$ctrl.updateUser(user)"></user-card>`,
                resolve: {
                    // download user data before rendering the state
                    userData: function($stateParams, ContactsService) {
                        return ContactsService.getOne($stateParams.userId);
                    }
                },
                controller: UserCardStateController,
                controllerAs: 'stateCtrl'
            })
    });

function UserCardController($state) {
    // Helper method for determining when to show the user card.
    // When state will be "user-card", it will allow "ng-if" directive
    // at the template to show the user card.
    this.isUserCardAllowed = function() {
        return $state.is('user-card');
    }
}

function UserCardStateController(userData) {
    this.selectedUser = userData;
}