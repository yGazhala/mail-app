'use strict';
angular
    .module('mailBox')
    .component('compose', {
        bindings: {},
        templateUrl: 'mail-box/compose.html',
        controller: ComposeController
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('compose', {
                parent: 'mail-box',
                url: '/compose',
                template: `<compose></compose>`
            })
    });

function ComposeController(MailDataService, $state) { // contacts service
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