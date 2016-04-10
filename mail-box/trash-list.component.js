'use strict';
angular
    .module('mailBox')
    .component('trashList', {
        bindings: {
            messages: '<'
        },
        templateUrl: 'mail-box/trash-list.html',
        controller: TrashListController
    })

    .config(function($stateProvider){
        $stateProvider
            .state('trash-list', {
                parent: 'mail-box',
                url: '/trash-list',
                resolve: {
                   trashListPromise: function(MailDataService) {
                       return MailDataService.getBox('trash');
                   }
                },
                template: '<trash-list messages="stateCtrl.trashList"></trash-list>',
                controller: TrashListStateController,
                controllerAs: 'stateCtrl'
            })
    });

function TrashListController($state) {
    this.isTrashListAllowed = function() {
        return $state.is('trash-list');
    }
}

function TrashListStateController(trashListPromise) {
    this.trashList = trashListPromise;
}