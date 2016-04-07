'use strict';
angular
    .module('mailBox')

    .component('mailBoxes', {
        bindings: {},
        template: '', // может здесь тоже глюк
        controller: MailBoxesController
    })

    .config(function($stateProvider){
        $stateProvider
            .state('mail-box', {
                abstract: true,
                template: '<ui-view></ui-view>' // глюк здесь
            })
    });

function MailBoxesController(MailDataService) {
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