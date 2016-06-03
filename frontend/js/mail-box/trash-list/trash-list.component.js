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

TrashListController.$inject = ['$state', 'NavStatusService'];
function TrashListController($state, NavStatusService) {
    NavStatusService.setStatus('Trash');

    this.isTrashListAllowed = function() {
        return $state.is('trash-list');
    };

    this.isMobileSearchFieldOpened = false;

    this.toggleMobileSearchField = function() {
        this.isMobileSearchFieldOpened = !this.isMobileSearchFieldOpened;
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