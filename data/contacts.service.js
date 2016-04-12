"use strict";
angular
    .module('services')
    .service('ContactsService', ContactsService);

function ContactsService($http, NormalizeToArrayFactory) {
    this.url = 'https://gazhala.firebaseio.com/contacts';

    this.getOne = function(userId) {
        return $http.get(this.url + '/' + userId + '.json')
            .then(response => response.data);
    };

    this.getAll = function() {

        return $http.get(this.url + '.json')
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.log('Failed to load data from: ' + this.url +'.json' + ', error: '
                    + error.status + ' - ' + error.statusText);
            });
    };

    this.addUser = function(newUser) {

        return $http.post(this.url + '.json', newUser)
            .then((response) => {
                // When we remove or update an object at FireBase, we need
                // a key to identify this object. This key is automatically created
                // by FireBase when we add the object at the first time.
                // So, we save the key in "id" property of the object.
                newUser.id = response.data.name;

                return newUser;
            })
            // newUser.id does not store at FireBase, therefore we need an additional PUT method
            .then(() => {
                return $http.put(this.url + '/' + newUser.id + '.json', newUser)
            })
            .then((response) => response.data);
        // catch method will be here someday
    };

    this.removeUser = function(user) {

        return $http.delete(this.url + '/' + user.id + '.json')
            .then((response) => response.data); // response.data === null
        // catch method will be here someday
    };

    this.updateUser = function(user) {

        return $http.put(this.url + '/' + user.id + '.json', user)
            .then((response) => response.data);
        // catch method will be here someday
    };
}