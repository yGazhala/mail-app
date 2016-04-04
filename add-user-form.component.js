'use strict';

angular
    .module('mailApp')
    .component('addUserForm', {
        bindings: {
            addNewUser: '&'
        },
        template: '<add-user-form add-new-user="$ctrl.addNewUser(user)"></add-user-form>'
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('add-user', {
                parent: 'contacts-list',
                url: '/add-user',
                templateUrl: 'add-user-form.html',
                controller: function(PageMaskService) {
                    PageMaskService.open();
                }
            })
    });