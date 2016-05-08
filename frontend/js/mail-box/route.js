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
            data: {
                currentNavStatus: 'Compose'
            },
            template: '<compose></compose>'
        })

        .state('message-list', {
            parent: 'mail-box',
            url: '/list/:boxId',
            data: {
                currentNavStatus: 'message-list'
            },
            template: `<message-list messages="stateCtrl.currentBox"
                           move-message-to-trash="$ctrl.moveMessageToTrash(message)"
                               ></message-list>`,
            resolve: { // download data before rendering the state
                currentBoxPromise: (MailDataService, $stateParams) =>
                    MailDataService.getBox($stateParams.boxId)
            },
            controller: function(currentBoxPromise) { this.currentBox = currentBoxPromise; },
            controllerAs: 'stateCtrl'
        })

        .state('message', {
            parent: 'message-list',
            url: '/:id',
            template: '<message message="stateCtrl.message"></message>',
            resolve: {
                currentMessagePromise: ($stateParams, MailDataService) =>
                    MailDataService.getMessage($stateParams.boxId, $stateParams.id)
            },
            controller: function(currentMessagePromise) { this.message = currentMessagePromise; },
            controllerAs: 'stateCtrl'
        })

        .state('trash-list', {
            parent: 'mail-box',
            url: '/trash-list',
            data: {
                currentNavStatus: 'Trash'
            },
            resolve: {
                messagesPromise: (MailDataService) => MailDataService.getBox('trash')
            },
            template: `<trash-list messages="stateCtrl.messages"
                                move-message-to-original-box=
                                    "$ctrl.moveMessageToOriginalBox(message)"
                                        ></trash-list>`,
            controller: function (messagesPromise) { this.messages = messagesPromise; },
            controllerAs: 'stateCtrl'
        })

        .state('trash-details', {
            parent: 'trash-list',
            url: '/:id',
            template: `<trash-details messages="$ctrl.messages"
                            current-message-id="stateCtrl.currentMessageId"></trash-details>`,
            resolve: {
                currentMessageId: ($stateParams) => $stateParams.id
            },
            controller: function (currentMessageId) { this.currentMessageId = currentMessageId; },
            controllerAs: 'stateCtrl'
        });

    $urlRouterProvider.otherwise('account/mail-box/list/inbox');
}
