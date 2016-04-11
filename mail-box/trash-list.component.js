'use strict';
angular
    .module('mailBox')
    .component('trashList', {
        bindings: {
            messages: '<', // get data from state controller
            moveMessageToOriginalBox: '&' // callback to parent mail-box component
        },
        templateUrl: 'mail-box/trash-list.html',
        controller: TrashListController
    })

    .config(function($stateProvider){
        $stateProvider
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
                controller: TrashListStateController,
                controllerAs: 'stateCtrl'
            })
    });

function TrashListController($state) {
    this.isTrashListAllowed = function() {
        return $state.is('trash-list');
    };

    this.restoreMessage = function(message) {
        // callback to parent mail-box component
        this.moveMessageToOriginalBox({message: message}).then(() => {
            // remove the message from current list
            this.messages.splice(this.messages.indexOf(message), 1);
        })
    }
}

function TrashListStateController(messagesPromise) {
    this.messages = messagesPromise;
}