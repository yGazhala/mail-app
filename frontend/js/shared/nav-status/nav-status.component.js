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
    // The default state of application is:
    // account/mail-box/list/inbox (see: mail-box/route.js),
    // so the default current status is also 'Inbox'.
    this.currentNavStatus = 'Inbox';

    // The current navigation status is saved in the data property
    // of these root states:
    // 'account.mail-box.compose' - nav status text: 'Compose'
    // 'account.mail-box.trash-list' - nav status text: 'Trash'
    // 'account.mail-box.message-list.' - nav status text: 'message-list'
    // 'account.contacts-list' - nav status text: 'Contacts'

    $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
        if(!toState.data) {return;}

        let status = toState.data.currentNavStatus;

        if(status !== 'message-list') {
            this.currentNavStatus = status;
        // determine whether the current status is inbox or sent-mail
        } else {
            if(toParams.boxId === 'inbox') {
                this.currentNavStatus = 'Inbox';
            } else {
                if(toParams.boxId === 'sent-mail') {
                    this.currentNavStatus = 'Sent mail';
                }
            }
        }
    });
}

export default navStatusComponent;
