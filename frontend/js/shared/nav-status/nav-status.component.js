'use strict';
// This helper component determines the current root navigation
// status and sends message to the user.

import template from './nav-status.html';

let navStatusComponent = {
    bindings: {},
    template: template,
    controller: NavStatusController
};

function NavStatusController($rootScope) {
    this.currentNavStatus = null;

    // The current navigation status is saved in the data property
    // of these root states:
    // 'account.mail-box.compose' - nav status text: 'Compose'
    // 'account.mail-box.trash-list' - nav status text: 'Trash'
    // 'account.mail-box.message-list.' - nav status text: 'message-list'
    // 'account.contacts-list' - nav status text: 'Contacts'

    $rootScope.$on('$stateChangeStart', (event, toState) => {
        this.currentNavStatus = toState.data.currentNavStatus;
    });

}

export default navStatusComponent;
