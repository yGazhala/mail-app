'use strict';
import template from './message-list.html';

let messageListComponent = {
        bindings: {
            messages: '<', // get data from stateCtrl
            moveMessageToTrash: '&' //callback to parent mail-box component
        },
        template,
        controller: MessageListController
};

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

export default messageListComponent;