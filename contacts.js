'use strict';

let contactsModule = angular.module('contacts', []);

contactsModule.factory('ContactsService', function($http) {
    return {
        getAll() {
            let url = 'https://gazhala.firebaseio.com/contacts.json';

            return $http.get(url)
                        .then((response) => response.data)
                        .catch((error) => {
                            console.log('Failed to load data from: ' + url + ', error: '
                                + error.status + ' - ' + error.statusText);
                        });
        }
    }
});

contactsModule.component('contacts', {
    bindings: {},

    controller: function(ContactsService) {
        ContactsService.getAll().then((users) =>
                this.users = users);
    },

    templateUrl: 'contacts.html'
});
