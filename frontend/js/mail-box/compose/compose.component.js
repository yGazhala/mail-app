'use strict';
import template from './compose.html';

let composeComponent = {
        bindings: {
            showStatusMessage: '&' // callback to parent mail-box component
        },
        template,
        controller: ComposeController
};

function ComposeController(MailDataService, NavStatusService, $state) {
    NavStatusService.setStatus('Compose');

    this.isSubmitEnabled = true;

    this.enableSubmit = function() {
        if (!this.isSubmitEnabled) {
            this.isSubmitEnabled = true;
        }
    };

    this.disableSubmit = function() {
        if (this.isSubmitEnabled) {
            this.isSubmitEnabled = false;
        }
    };

    this.addNewMessageToSentMail = function(newMessage) {
        this.disableSubmit();

        MailDataService.addNewMessageToSentMail(newMessage)
            .then(() => {
                this.showStatusMessage({
                    message: 'Your message has been moved to sent mail'
                });
                $state.go('message-list', {boxId: 'sent-mail'});
            });
    };
}

export default composeComponent;