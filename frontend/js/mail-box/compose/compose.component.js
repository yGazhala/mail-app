'use strict';
import template from './compose.html';

let composeComponent = {
        bindings: {
            showStatusMessage: '&' // callback to parent mail-box component
        },
        template: template,
        controller: ComposeController
};

ComposeController.$inject = ['MailDataService', 'ContactsService', 'NavStatusService', '$state'];
function ComposeController(MailDataService, ContactsService, NavStatusService, $state) {
    NavStatusService.setStatus('Compose');

    //ngMaterial autocomplete
    ContactsService.getAll().then((contacts) => {
        this.contacts = contacts;
    });
    // get the recipient email from the autocomplete input
    this.recipientEmail = null;
    this.searchText = null;
    // update the recipient email, when the search text changes
    this.searchTextChange = function (text) { this.recipientEmail = text; };
    // update the recipient email, when the selected item changes
    this.selectedItemChange = function (item) { if (!item) return; this.recipientEmail = item.email;};
    this.querySearch = querySearch;

    // Disable the submit, when the message is sending
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

    // Sending the message
    this.addNewMessageToSentMail = function(newMessage) {
        this.disableSubmit();

        // Checking the recipient email
        if (!isRecipientEmailValid(this.recipientEmail)) {
            this.showStatusMessage({message: 'Error: the recipient email is invalid'});
            this.enableSubmit();

            return;
        }

        newMessage.email = this.recipientEmail;
        MailDataService.addNewMessageToSentMail(newMessage)
            .then(() => {
                this.showStatusMessage({message: 'Your message has been moved to sent mail'});
                $state.go('message-list', {boxId: 'sent-mail'});
            });

        function isRecipientEmailValid(email) {
            let emailRegExp = /\b[\w\.-]+?@\w[\w\.-]*?\b/i;

            return emailRegExp.test(email);
        }
    };


    // internal methods of the autocomplete search
    function querySearch (query) {
        let results = this.contacts;

        if (query) {
            results = results.filter(createFilterFor(query));
        }

        return results;
    }

    function createFilterFor(query) {
        let lowercaseQuery = query.toLowerCase();

        return function filterFn(item) {
            let strForSearch = item.fullName.toLowerCase();

            return (strForSearch.indexOf(lowercaseQuery) !== -1);
        };
    }
}

export default composeComponent;