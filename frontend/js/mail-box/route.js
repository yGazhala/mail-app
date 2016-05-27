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
            template: '<compose show-status-message="$ctrl.showStatusMessage(message)"></compose>'
        })

        .state('message-list', {
            parent: 'mail-box',
            url: '/list/:boxId',
            template: `<message-list messages="stateCtrl.currentBox"
                           box-id="stateCtrl.boxId"
                           move-message-to-trash="$ctrl.moveMessageToTrash(message)"
                               ></message-list>`,
            resolve: { // download data before rendering the state
                currentBoxPromise: (MailDataService, $stateParams) =>
                    MailDataService.getBox($stateParams.boxId),
                currentBoxId: ($stateParams) => $stateParams.boxId
            },
            controller: function(currentBoxPromise, currentBoxId) {
                this.currentBox = currentBoxPromise;
                this.boxId = currentBoxId;
            },
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
