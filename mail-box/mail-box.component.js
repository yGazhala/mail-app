'use strict';
angular
    .module('mailBox')

    .component('mailBox', {
        bindings: {},
        template: '',
        controller: MailBoxController
    })


    .config(function($stateProvider){
        $stateProvider
            .state('mail-box', {
                abstract: true,
                url: '/mail-box',
                template: '<ui-view></ui-view>'
            })
    });

function MailBoxController(MailDataService) {
    //MailDataService.getInbox().then((mailBox) => {
    //    this.inbox = mailBox;
    //});

    //MailDataService.getSentMail().then((mailBox) => {
    //    this.sentMail = mailBox;
    //});


    this.isNewMessageDisplayOpened = false;

    this.toggleNewMessageDisplay = function() {
        this.isNewMessageDisplayOpened = !this.isNewMessageDisplayOpened;
        this.togglePageMask();
    };

    this.moveNewMessageToSentMail = function(newMessage) {
        this.toggleNewMessageDisplay();
        MailDataService.add(newMessage)
            .then((message) => {
                this.sentMail.push(message);
            })
    };
}