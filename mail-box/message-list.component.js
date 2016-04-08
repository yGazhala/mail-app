'use strict';
angular
    .module('mailBox')
    .component('messageList', {
        bindings: {
            messages: '<'
        },
        templateUrl: 'mail-box/message-list.html',
        controller: MessageListController
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('mail-box/list/inbox');
        $stateProvider
            .state('message-list', {
                parent: 'mail-box',
                url: '/list/:boxId',
                template: `<message-list messages="stateCtrl.currentBox"></message-list>`,

                resolve: { // download data before rendering the state
                    currentBoxPromise: function(MailDataService, $stateParams) {
                        return MailDataService.getBox($stateParams.boxId);
                    }
                },

                controller: MessageListStateController,
                controllerAs: 'stateCtrl'
            });
    });

function MessageListStateController(currentBoxPromise) {
    this.currentBox = currentBoxPromise;
}

function MessageListController($state) {
    this.isMessageListAllowed = function() {
        return $state.is('message-list');
    }
}