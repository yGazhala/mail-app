'use strict';
angular
    .module('mailBox')
    .service('MailDataService', MailDataService);


function MailDataService($http, NormalizeToArrayFactory) {
    this.url = 'https://gazhala.firebaseio.com/';

    this.getBox = function(boxId) {

        return $http.get(this.url + boxId + '.json')
            .then((response) => NormalizeToArrayFactory(response.data));
    };
    
    this.getMessage = function(boxId, messageId) {

        return $http.get(this.url + boxId + '/' + messageId + '.json')
            .then((response) => response.data);
    };

    this.getInbox = function() {
        let url = 'https://gazhala.firebaseio.com/inbox.json';

        return $http.get(url)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.log('Failed to load data from: ' + url + ', error: '
                    + error.status + ' - ' + error.statusText);
            });
    };

    this.getSentMail = function() {
        let url = 'https://gazhala.firebaseio.com/sent-mail.json';

        return $http.get(url)
            .then((response) => NormalizeToArrayFactory(response.data))
            .catch((error) => {
                console.log('Failed to load data from: ' + url + ', error: '
                    + error.status + ' - ' + error.statusText);
            });
    };

    this.addNewMessageToSentMail = function(message) {
        message.boxId = 'sent-mail';
        message.date = new Date().getTime(); // save date in milliseconds

        return $http.post(this.url + 'sent-mail.json', message)
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
            // therefore we implement additional PUT method
            .then(() => {
                return $http.put(this.url + 'sent-mail/' + message.id + '.json', message)
            })
            .then((response) => response.data);
            // .catch method will be here someday

    };

    this.addMessageToTrash = function(message) {

        return $http.post(this.url + 'trash.json', message)
            .then((response) => {
                message.id = response.data.name; // rewrite id

                return message;
            })
            .then(() => {
                return $http.put(this.url + 'trash/' + message.id + '.json', message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };

    this.removeMessage = function(message) {

        return $http.delete(this.url + message.boxId + '/' + message.id + '.json')
            .then((response) => response.data); // response.data === null
    }
}
