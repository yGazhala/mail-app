'use strict';
angular
    .module('mailBox')

    .component('mailBox', {
        bindings: {},
        template: '<ui-view></ui-view>',
        controller: MailBoxController
    })


    .config(function($stateProvider){
        $stateProvider
            .state('mail-box', {
                abstract: true,
                url: '/mail-box',
                template: '<mail-box></mail-box>'
            })
    });

function MailBoxController(MailDataService, $state) {

    this.moveMessageToTrash = function(message) {
        MailDataService.removeMessage(message)
        .then(() => MailDataService.addMessageToTrash(message))
        .then(() => $state.reload('message-list', {boxId: message.boxId}));
    }

}