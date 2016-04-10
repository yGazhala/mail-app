'use strict';
angular
    .module('mailBox')
    .component('messageList', {
        bindings: {
            messages: '<', // get data from stateCtrl
            moveMessageToTrash: '&' //callback to parent mail-box component
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
                template: `<message-list messages="stateCtrl.currentBox"
                                move-message-to-trash="$ctrl.moveMessageToTrash(message)"
                                    ></message-list>`,

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
    };

    this.removeMessage = function(message) {
        // callback to parent mail-box component
        this.moveMessageToTrash({message: message}).then(() => {
            // remove the message from current list
            this.messages.splice(this.messages.indexOf(message), 1);
        });
    }
}