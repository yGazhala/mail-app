'use strict';

angular
    .module('shared')
    .component('layout', {
        bindings: {},
        templateUrl: 'shared/layout.html'
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                url: '/account',
                template: '<layout></layout>'
                //controller: LayoutStateController,
                //controllerAs: 'stateCtrl'
            })
    });

//function LayoutStateController() {
//
//}