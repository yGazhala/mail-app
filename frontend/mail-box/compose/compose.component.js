'use strict';
import template from './compose.html';

let composeComponent = {
        bindings: {},
        template,
        controller: ComposeController
};

function ComposeController(MailDataService, $state) {
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
            .then(() =>
                $state.go('message-list', {boxId: 'sent-mail'})
            );
    };
}

export default composeComponent;