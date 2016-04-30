'use strict';

export default function MailDataService($http, NormalizeToArrayFactory, FIREBASE_URI, FIREBASE_SECRET) {
    let uri = FIREBASE_URI + '/';

    this.getBox = function(boxId) {

        return $http.get(uri + boxId + '.json' + FIREBASE_SECRET)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.error('Failed to load data from: ' + uri + boxId + '.json' + FIREBASE_SECRET
                    + ', error: ' + error.status + ' - ' + error.statusText);
            });
    };
    
    this.getMessage = function(boxId, messageId) {

        return $http.get(uri + boxId + '/' + messageId + '.json' + FIREBASE_SECRET)
            .then((response) => response.data);
    };

    this.addNewMessageToSentMail = function(message) {
        message.boxId = 'sent-mail';
        message.date = new Date().getTime(); // save date in milliseconds

        return $http.post(uri + 'sent-mail.json' + FIREBASE_SECRET, message)
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
                return $http.put(uri + 'sent-mail/' + message.id + '.json' + FIREBASE_SECRET, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday

    };

    this.addMessageToTrash = function(message) {

        return $http.post(uri + 'trash.json' + FIREBASE_SECRET, message)
            .then((response) => {
                message.id = response.data.name; // rewrite id

                return message;
            })
            .then(() => {
                return $http.put(uri + 'trash/' + message.id + '.json' + FIREBASE_SECRET, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };

    this.addMessage = function(message) {

        return $http.post(uri + message.boxId + '.json' + FIREBASE_SECRET, message)
            .then((response) => {
                message.id = response.data.name; // rewrite id

                return message;
            })
            .then(() => {
                return $http.put(uri + message.boxId + '/' + message.id + '.json' + FIREBASE_SECRET, message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };

    this.removeMessage = function(message) {

        return $http.delete(uri + message.boxId + '/' + message.id + '.json' + FIREBASE_SECRET)
            .then((response) => response.data); // response.data === null
    };

    this.removeMessageFromTrash = function(message) {

        return $http.delete(uri + 'trash/' + message.id + '.json' + FIREBASE_SECRET)
            .then((response) => response.data); // response.data === null
    }
}
