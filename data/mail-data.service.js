'use strict';
angular
    .module('services')
    .service('MailDataService', MailDataService);


function MailDataService($http, NormalizeToArrayFactory) {
    this.url = 'https://gazhala.firebaseio.com/';
    this.secret = '?auth=8EkruGOhqgy8x3V8Zyma3abWFaz70EnPjhTeX2KU';

    this.getBox = function(boxId) {

        return $http.get(this.url + boxId + '.json' + this.secret)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.error('Failed to load data from: ' + this.url + boxId + '.json' + this.secret
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };
    
    this.getMessage = function(boxId, messageId) {

        return $http.get(this.url + boxId + '/' + messageId + '.json' + this.secret)
            .then((response) => response.data);
    };

    this.addNewMessageToSentMail = function(message) {
        message.boxId = 'sent-mail';
        message.date = new Date().getTime(); // save date in milliseconds

        return $http.post(this.url + 'sent-mail.json' + this.secret, message)
            .then((response) => {
                // When we add the new object to FireBase, we need
                // a key to identify this object in future.
                // This key was automatically created by FireBase
                // when we added the object at the first time.
                // All we need - is to save the key in "id" property of the object.
                message.id = response.data.name;

                return message;
            })
            // Now, we have the id, but it does not stored at the FireBase,
            // therefore we implement an additional PUT method
            .then(() => {
                return $http.put(this.url + 'sent-mail/' + message.id + '.json' + this.secret, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday

    };

    this.addMessageToTrash = function(message) {

        return $http.post(this.url + 'trash.json' + this.secret, message)
            .then((response) => {
                message.id = response.data.name; // rewrite id

                return message;
            })
            .then(() => {
                return $http.put(this.url + 'trash/' + message.id + '.json' + this.secret, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };

    this.addMessage = function(message) {

        return $http.post(this.url + message.boxId + '.json' + this.secret, message)
            .then((response) => {
                message.id = response.data.name; // rewrite id

                return message;
            })
            .then(() => {
                return $http.put(this.url + message.boxId + '/' + message.id + '.json' + this.secret, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };

    this.removeMessage = function(message) {

        return $http.delete(this.url + message.boxId + '/' + message.id + '.json' + this.secret)
            .then((response) => response.data); // response.data === null
    };

    this.removeMessageFromTrash = function(message) {

        return $http.delete(this.url + 'trash/' + message.id + '.json' + this.secret)
            .then((response) => response.data); // response.data === null
    }
}
