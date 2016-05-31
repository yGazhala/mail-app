'use strict';
import template from './message-list.html';

let messageListComponent = {
        bindings: {
            messages: '<', // get data from stateCtrl
            boxId: '<', // get data from stateCtrl
            moveMessageToTrash: '&' //callback to parent mail-box component
        },
        template: template,
        controller: MessageListController
};

/*@ngInject*/
function MessageListController($state, NavStatusService) {
    if(this.boxId === 'inbox') {
        NavStatusService.setStatus('Inbox');
    } else {
        NavStatusService.setStatus('Sent mail');
    }

    this.isMessageListAllowed = function() {
        return $state.is('message-list');
    };

    this.isMobileSearchFieldOpened = false;

    this.toggleMobileSearchField = function() {
        this.isMobileSearchFieldOpened = !this.isMobileSearchFieldOpened;
    };

    this.removeMessage = function(message) {
        // callback to parent mail-box component
        this.moveMessageToTrash({message: message}).then(() => {
            // remove the message from current list
            this.messages.splice(this.messages.indexOf(message), 1);
        });
    }
}

export default messageListComponent;