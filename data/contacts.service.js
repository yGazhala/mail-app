"use strict";
angular
    .module('services')
    .service('ContactsService', ContactsService);

function ContactsService($http, NormalizeToArrayFactory) {
    this.url = 'https://gazhala.firebaseio.com/contacts';
    this.secret = '?auth=8EkruGOhqgy8x3V8Zyma3abWFaz70EnPjhTeX2KU';

    this.getOne = function(userId) {
        return $http.get(this.url + '/' + userId + '.json' + this.secret)
            .then(response => response.data);
    };

    this.getAll = function() {

        return $http.get(this.url + '.json' + this.secret)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.error('Failed to load data from: ' + this.url +'.json' + this.secret
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.addUser = function(newUser) {

        return $http.post(this.url + '.json' + this.secret, newUser)
            .then((response) => {
                // When we add the new object to FireBase, we need
                // a key to identify this object in future.
                // This key was automatically created by FireBase
                // when we added the object at the first time.
                // All we need - is to save the key in "id" property of the object.
                newUser.id = response.data.name;

                return newUser;
            })
            // Now, we have the id, but it does not stored at the FireBase,
            // therefore we implement an additional PUT method
            .then(() => {
                return $http.put(this.url + '/' + newUser.id + '.json' + this.secret, newUser)
            })
            .then((response) => response.data);
            // catch method will be here someday
    };

    this.removeUser = function(user) {

        return $http.delete(this.url + '/' + user.id + '.json' + this.secret)
            .then((response) => response.data); // response.data === null
            // catch method will be here someday
    };

    this.updateUser = function(user) {

        return $http.put(this.url + '/' + user.id + '.json' + this.secret, user)
            .then((response) => response.data);
            // catch method will be here someday
    };
}