'use strict';
angular
    .module('mailBox')
    .service('MailDataService', MailDataService);


function MailDataService($http, NormalizeToArrayFactory) {

    this.getBox = function(boxId) {
        let url = 'https://gazhala.firebaseio.com/';

        return $http.get(url + boxId + '.json')
            .then((response) => NormalizeToArrayFactory(response.data));
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

    this.add = function(message) {
        let url = 'https://gazhala.firebaseio.com/sent-mail.json';
        message.boxId = 'sentMail';
        message.date = new Date().getTime(); // save date in milliseconds

        return $http.post(url, message)
            .then((response) => {
                // When we add the new object to FireBase, we need
                // a key to identify this object in future. This key is automatically created
                // by FireBase when we add the object at the first time.
                // So, we save the key in "id" property of the object.
                message.id = response.data.name;

                return message;
            })
            // message.id does not store at firebase, therefore we need additional PUT method
            .then(() => { // message
                return $http.put('https://gazhala.firebaseio.com/sent-mail/' + message.id + '.json', message)
            })
            .then((response) => response.data);
            // .catch method will be here someday
    };
}
