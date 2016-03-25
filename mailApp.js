'use strict';
let app = angular.module('mailApp', ['ngMessages']);


app.service('MailDataService', function($http) {

    this.getInbox = function() {
        let url = 'https://gazhala.firebaseio.com/inbox.json';

        return $http.get(url)
                // In response, the firebase returns an object instead of
                // a string, therefore we do not need to use JSON.parse(),
                // but just take content of response.data
                .then((response) => normalizeToArray(response.data))
                .catch((error) => {
                    console.log('Failed to load data from: ' + url + ', error: '
                        + error.status + ' - ' + error.statusText);
                });
    };

    this.getSentMail = function() {
        let url = 'https://gazhala.firebaseio.com/sent-mail.json';

        return $http.get(url)
            .then((response) => normalizeToArray(response.data))
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
                    // When we remove or update an object at FireBase, we need
                    // a key to identify this object. This key is automatically created
                    // by FireBase when we add the object at the first time.
                    // So, we save the key in "id" property of the object.
                    message.id = response.data.name;

                    return message;
                })
                // message.id does not store at firebase, therefore we need additional PUT method
                .then((message) => {
                    return $http.put('https://gazhala.firebaseio.com/sent-mail/' + message.id + '.json', message)
                })
                .then((response) => response.data);
                // .catch method will be here someday
    };

});


app.component('mailApp', {
    bindings: {},

    controller: function(MailDataService) {

        MailDataService.getInbox().then((mailBox) => {
            this.inbox = mailBox;
            this.mailBoxSelected = this.inbox; // select "Inbox" as a default
        });

        MailDataService.getSentMail().then((mailBox) => {
            this.sentMail = mailBox;
        });

        // there are helper flags for determining status of the main display component
        this.isMailBoxShowed = true;
        this.messageSelected = null;
        this.isContactsShowed = false;

        this.showMessage = function (message) {
            this.isMailBoxShowed = false;
            this.isContactsShowed = false;
            this.messageSelected = message;
        };

        this.showMailBox = function (mailBox) {
            this.isContactsShowed = false;
            this.isMailBoxShowed = true;
            this.mailBoxSelected = mailBox;
        };

        this.showContacts = function() {
            this.mailBoxSelected = null;
            this.isMailBoxShowed = false;
            this.messageSelected = null;
            this.isContactsShowed = true;
        };

        this.isNewMessageDisplayOpened = false;

        this.toggleNewMessageDisplay = function() {
            this.isNewMessageDisplayOpened = !this.isNewMessageDisplayOpened;
            this.togglePageMask();
        };

        this.moveNewMessageToSentMail = function(newMessage) {
            this.toggleNewMessageDisplay();
            MailDataService.add(newMessage)
                .then((NewMessage) => {
                    this.sentMail.push(NewMessage);
                })
        };

        // These methods toggle page mask
        this.isPageMaskOpened = false;

        this.openPageMask = function() {
            if (this.isPageMaskOpened) return;

            this.isPageMaskOpened = true;
        };

        this.closePageMask = function() {
            if (this.isPageMaskOpened === false) return;

            this.isPageMaskOpened = false;
        };

        this.togglePageMask = function() {
            this.isPageMaskOpened = !this.isPageMaskOpened;
        }
    },

    templateUrl: 'mail-app.html'
});



app.component('mainDisplay', {
    bindings: {
        // bound with mailApp component
        mailBoxSelected: '<',
        messageSelected: '<',
        isMailBoxShowed: '<',
        isContactsShowed: '<',
        onShowMailBox: '&',
        onShowMessage: '&',

        // pass on to "contacts" component
        onOpenPageMask: '&',
        onClosePageMask: '&',
        onTogglePageMask: '&'
    },

    templateUrl: 'main-display.html'
});


app.component('contacts', {
    bindings: {
        onOpenPageMask: '&',
        onClosePageMask: '&',
        onTogglePageMask: '&'
    },

    controller: function(ContactsService) {
        ContactsService.getAll().then((contacts) =>
            this.contacts = contacts);

        this.userCard = null;
        this.isUserSelected = false;
        this.isAddUserFormOpened = false;

        this.showUserCard = function(userCard) {
            this.isUserSelected = true;
            this.userCard = userCard;
        };

        this.backToContacts = function() {
            this.onClosePageMask();
            this.userCard = null;
            this.isUserSelected = false;
            this.isAddUserFormOpened = false;
        };

        this.openAddUserForm = function() {
            this.onOpenPageMask();
            this.isAddUserFormOpened = true;
        };

        this.newUserCard = null;

        this.addNewUser = function(newUser) {
            this.onClosePageMask();
            this.isAddUserFormOpened = false;

            this.newUserCard = newUser;

            if (this.newUserCard) {
                ContactsService.addUser(this.newUserCard)
                    .then((newUserCard) => {
                        this.contacts.push(newUserCard);
                        this.newUserCard = null;
                    })
            }
        };

        this.removeUser = function (user) {
            ContactsService.removeUser(user)
                .then(() => {
                    this.contacts.splice(this.contacts.indexOf(user), 1);
                });
        };

        this.isUserEditFormOpened = false;

        this.toggleUserEditForm = function() {
            this.onTogglePageMask();
            this.isUserEditFormOpened = !this.isUserEditFormOpened;
        };

        this.updateUser = function(user) {
            ContactsService.updateUser(user);
        }
    },

    templateUrl: 'contacts.html'
});

app.service('ContactsService', function($http) {
    this.url = 'https://gazhala.firebaseio.com/contacts';

    this.getAll = function() {

        return $http.get(this.url + '.json')
            .then((response) => normalizeToArray(response.data))
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
            });
            // catch method will be here someday
    };

    this.removeUser = function(user) {

        return $http.delete(this.url + '/' + user.id + '.json')
            .then((response) => response.data);
            // catch method will be here someday
    };

    this.updateUser = function(user) {

        return $http.put(this.url + '/' + user.id + '.json', user)
            .then((response) => response.data);
            // catch method will be here someday
    };
});

app.component('newMessage', {
    bindings: {
        isNewMessageDisplayOpened: '<',
        onToggleNewMessageDisplay: '&',
        onMoveNewMessageToSentMail: '&'
    },
    templateUrl: 'new-message.html'
});


function normalizeToArray(object) {
    if(!object) return [];

    return Object.keys(object).map(key => {
        let normalizedObject = object[key];
        normalizedObject.id = key;

        return normalizedObject;
    });
}