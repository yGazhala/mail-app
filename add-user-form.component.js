'use strict';

angular
    .module('mailApp')
    .component('addUserForm', {
        bindings: {
            addNewUser: '&'
        },
        templateUrl: 'add-user-form.html',
        controller: AddUserFormController
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('add-user', {
                parent: 'contacts-list',
                url: '/add-user',
                template: `<add-user-form
                               add-new-user="$ctrl.addNewUser(user)"></add-user-form>`,
                controller: function(PageMaskService) {
                    PageMaskService.open();
                }
            })
    });

function AddUserFormController(PageMaskService) {
    this.closePageMask = function() {
        PageMaskService.close();
    }
}