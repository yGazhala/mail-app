"use strict";

/*@ngInject*/
export default function ContactsService($http, NormalizeToArrayFactory, FIREBASE_URI, FIREBASE_SECRET) {
    let uri = FIREBASE_URI + '/contacts';

    this.getOne = function(userId) {
        return $http.get(uri + '/' + userId + '.json' + FIREBASE_SECRET)
            .then(response => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + userId + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.getAll = function() {

        return $http.get(uri + '.json' + FIREBASE_SECRET)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.error('Failed to load data from: ' + uri +'.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.addUser = function(newUser) {

        return $http.post(uri + '.json' + FIREBASE_SECRET, newUser)
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
                return $http.put(uri + '/' + newUser.id + '.json' + FIREBASE_SECRET, newUser)
            })
            .then((response) => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.removeUser = function(user) {

        return $http.delete(uri + '/' + user.id + '.json' + FIREBASE_SECRET)
            .then((response) => response.data) // response.data === null
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + user.id + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };

    this.updateUser = function(user) {

        return $http.put(uri + '/' + user.id + '.json' + FIREBASE_SECRET, user)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + '/' + user.id + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };
}