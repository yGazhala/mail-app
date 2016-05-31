'use strict';
import template from './trash-details.html';

let trashDetailsComponent = {
    bindings: {
        messages: '<', // get data from parent trash-list component
        currentMessageId: '<' // get data from state controller
    },
    template: template,
    controller: TrashDetailsController
};

function TrashDetailsController() {

    this.currentMessage = (() => {
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === this.currentMessageId) {
                return this.messages[i];
            }
        }
    })();
}

export default trashDetailsComponent;