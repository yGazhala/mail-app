'use strict';
angular
    .module('mailBox')
    .component('trashDetails', {
        bindings: {
            messages: '<'
        },
        templateUrl: 'mail-box/trash-details.html',
        controller: TrashDetailsController
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('trash-details', {
                parent: 'trash-list',
                url: '/:id',
                template: '<trash-details messages="$ctrl.messages"></trash-details>'
            })
    });

function TrashDetailsController($stateParams) {

    this.currentMessage = (() => {
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === $stateParams.id) {
                return this.messages[i];
            }
        }
    })();

    /*
    for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].id === $stateParams.id) {
            this.currentMessage = this.messages[i];
            break;
        }
    }
    */
}