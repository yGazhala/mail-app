'use strict';
angular
    .module('mailBox')
    .component('message', {
        bindings: {
            message: '<'
        },
        templateUrl: 'mail-box/message.html'
    })

    .config(function($stateProvider){
        $stateProvider
            .state('message', {
                parent: 'message-list',
                url: '/:id',
                template: '<message message="stateCtrl.message"></message>',
                resolve: {
                    currentMessagePromise: function($stateParams, MailDataService) {
                        return MailDataService.getMessage($stateParams.boxId, $stateParams.id)
                    }
                },
                controller: MessageStateController,
                controllerAs: 'stateCtrl'
            })
    });

function MessageStateController(currentMessagePromise) {
    this.message = currentMessagePromise;
}
