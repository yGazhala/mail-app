'use strict';

export default function routingConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mail-box', {
            abstract: true,
            parent: 'account',
            url: '/mail-box',
            template: '<mail-box></mail-box>'
        })

        .state('compose', {
            parent: 'mail-box',
            url: '/compose',
            template: `<compose></compose>`
        })

        .state('message-list', {
            parent: 'mail-box',
            url: '/list/:boxId',
            template: `<message-list messages="stateCtrl.currentBox"
                           move-message-to-trash="$ctrl.moveMessageToTrash(message)"
                               ></message-list>`,
            resolve: { // download data before rendering the state
                currentBoxPromise: function(MailDataService, $stateParams) {
                    return MailDataService.getBox($stateParams.boxId);
                }
            },
            controller: function(currentBoxPromise) {
                this.currentBox = currentBoxPromise;
            },
            controllerAs: 'stateCtrl'
        })

        .state('message', {
            parent: 'message-list',
            url: '/:id',
            template: '<message message="stateCtrl.message"></message>',
            resolve: {
                currentMessagePromise: function($stateParams, MailDataService) {
                    return MailDataService.getMessage($stateParams.boxId, $stateParams.id)
                }
            },
            controller: function(currentMessagePromise) {
                this.message = currentMessagePromise;
            },
            controllerAs: 'stateCtrl'
        })

        .state('trash-list', {
            parent: 'mail-box',
            url: '/trash-list',
            resolve: {
                messagesPromise: function(MailDataService) {
                    return MailDataService.getBox('trash');
                }
            },
            template: `<trash-list messages="stateCtrl.messages"
                                move-message-to-original-box=
                                    "$ctrl.moveMessageToOriginalBox(message)"
                                        ></trash-list>`,
            controller: function (messagesPromise) {
                this.messages = messagesPromise;
            },
            controllerAs: 'stateCtrl'
        })

        .state('trash-details', {
            parent: 'trash-list',
            url: '/:id',
            template: '<trash-details messages="$ctrl.messages"></trash-details>'
        });

    $urlRouterProvider.otherwise('account/mail-box/list/inbox');
}
