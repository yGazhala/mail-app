'use strict';

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routerConfig($stateProvider, $urlRouterProvider) {
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
            // download data before rendering the state
            resolve: {
                currentBoxPromise: ['MailDataService', '$stateParams', function (MailDataService, $stateParams) {
                    return MailDataService.getBox($stateParams.boxId);
                }],
                currentBoxId: ['$stateParams', function ($stateParams) {
                    return $stateParams.boxId;
                }]
            },
            controller: ['currentBoxPromise', 'currentBoxId', function(currentBoxPromise, currentBoxId) {
                this.currentBox = currentBoxPromise;
                this.boxId = currentBoxId;
            }],
            controllerAs: 'stateCtrl'
        })

        .state('message', {
            parent: 'message-list',
            url: '/:id',
            template: '<message message="stateCtrl.message"></message>',
            resolve: {
                currentMessagePromise: ['$stateParams', 'MailDataService', function ($stateParams, MailDataService) {
                    return MailDataService.getMessage($stateParams.boxId, $stateParams.id);
                }]
            },
            controller: ['currentMessagePromise', function(currentMessagePromise) {
                this.message = currentMessagePromise;
            }],
            controllerAs: 'stateCtrl'
        })

        .state('trash-list', {
            parent: 'mail-box',
            url: '/trash-list',
            resolve: {
                messagesPromise: ['MailDataService', function (MailDataService) {
                    return MailDataService.getBox('trash');
                }]
            },
            template: `<trash-list messages="stateCtrl.messages"
                                move-message-to-original-box=
                                    "$ctrl.moveMessageToOriginalBox(message)"
                                        ></trash-list>`,
            controller: ['messagesPromise', function (messagesPromise) {
                this.messages = messagesPromise;
            }],
            controllerAs: 'stateCtrl'
        })

        .state('trash-details', {
            parent: 'trash-list',
            url: '/:id',
            template: `<trash-details messages="$ctrl.messages"
                            current-message-id="stateCtrl.currentMessageId"></trash-details>`,
            resolve: {
                currentMessageId: ['$stateParams', function ($stateParams) {
                    return $stateParams.id;
                }]
            },
            controller: ['currentMessageId', function (currentMessageId) {
                this.currentMessageId = currentMessageId;
            }],
            controllerAs: 'stateCtrl'
        });

    $urlRouterProvider.otherwise('account/mail-box/list/inbox');
}

export default routerConfig;