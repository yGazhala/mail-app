'use strict';
angular
    .module('mailBox')
    .component('trash', {
        bindings: {
            messages: '<'
        },
        templateUrl: 'mail-box/trash.html'
    })

    .config(function($stateProvider){
        $stateProvider
            .state('trash', {
                parent: 'mail-box',
                url: '/trash',
                resolve: {
                   trashBoxPromise: function(MailDataService) {
                       return MailDataService.getBox('trash');
                   }
                },
                template: '<trash messages="stateCtrl.trashBox"></trash>',
                controller: TrashStateController,
                controllerAs: 'stateCtrl'
            })
    });

function TrashStateController(trashBoxPromise) {
    this.trashBox = trashBoxPromise;
}