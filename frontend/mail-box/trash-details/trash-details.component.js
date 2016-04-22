'use strict';
import template from './trash-details.html';

let trashDetailsComponent = {
    bindings: {
        messages: '<' // get data from parent trash-list component
    },
    template,
    controller: TrashDetailsController
};

function TrashDetailsController($stateParams) {

    this.currentMessage = (() => {
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === $stateParams.id) {
                return this.messages[i];
            }
        }
    })();
}

export default trashDetailsComponent;