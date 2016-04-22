'use strict';
import template from './trash-list.html';

let trashListComponent = {
    bindings: {
        messages: '<', // get data from state controller
        moveMessageToOriginalBox: '&' // callback to parent mail-box component
    },
    template: template,
    controller: TrashListController
};

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

export default trashListComponent;

