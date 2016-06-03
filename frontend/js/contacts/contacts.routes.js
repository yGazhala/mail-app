'use strict';

routerConfig.$inject = ['$stateProvider'];
function routerConfig($stateProvider) {
    $stateProvider
        .state('contacts-list', {
            parent: 'account',
            url: '/contacts-list',
            template: '<contacts-list></contacts-list>',
            controller: ['PageMaskService', function (PageMaskService) {
                PageMaskService.close();
            }]
        })

        .state('add-user', {
            parent: 'contacts-list',
            url: '/add-user',
            template: '<add-user-form add-new-user="$ctrl.addNewUser(user)"></add-user-form>',
            controller: ['PageMaskService', function(PageMaskService) {
                PageMaskService.open();
            }]
        })

        .state('user-card', {
            parent: 'contacts-list',
            url: '/:userId',
            template: `<user-card selected-user="stateCtrl.selectedUser"
                           update-user="$ctrl.updateUser(user)"></user-card>`,
            resolve: {
                // download user data before rendering the state
                userData: ['$stateParams','ContactsService', function($stateParams, ContactsService) {
                    return ContactsService.getOne($stateParams.userId);
                }]
            },
            controller: ['userData', function (userData) {
                this.selectedUser = userData;
            }],
            controllerAs: 'stateCtrl'
        })

        .state('edit-form', {
            parent: 'user-card',
            url: '/edit-form',
            template: `<user-edit-form selected-user="$ctrl.selectedUser"
                            update-user="$ctrl.updateUser({user: user})"
                                ></user-edit-form>`
        })
}

export default routerConfig;
