'use strict';

import mockContacts from './../mocks/mock-contacts.js';

describe('ContactsService', () => {
    let contacts = mockContacts;
    let ContactsService, $httpBackend, FIREBASE_URI, FIREBASE_SECRET;

    beforeEach(angular.mock.module('services'));
    beforeEach(angular.mock.inject( (_ContactsService_, _$httpBackend_, _FIREBASE_URI_, _FIREBASE_SECRET_) => {
        ContactsService = _ContactsService_;
        $httpBackend = _$httpBackend_;
        FIREBASE_URI = _FIREBASE_URI_;
        FIREBASE_SECRET = _FIREBASE_SECRET_;
    }));

    describe('.getOne(id)', () => {
        beforeEach(() => {
            $httpBackend.whenGET(FIREBASE_URI + '/contacts/1.json' + FIREBASE_SECRET).respond(contacts[1]);
        });

        it('should get one contact with id "1"', (done) => {
            ContactsService.getOne('1').then((user) => {
                expect(user).toEqual(contacts[1]);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.getAll()', () => {
        beforeEach(() => {
            $httpBackend.whenGET(FIREBASE_URI + '/contacts.json' + FIREBASE_SECRET).respond(contacts);
        });

        it('should get all contacts', (done) => {
            ContactsService.getAll().then((users) => {
                expect(users).toEqual(contacts);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.addUser(user)', () => {
        beforeEach(() => {
            $httpBackend.whenPOST(FIREBASE_URI + '/contacts.json' + FIREBASE_SECRET).respond({"name": "10"});
            $httpBackend.whenPUT(FIREBASE_URI + '/contacts/10.json' + FIREBASE_SECRET).respond(contacts[10]);
        });

        it('should add the new contact with id "10"', (done) => {
            ContactsService.addUser({fullName: "John Smith"}).then((newUser) => {
                expect(newUser).toEqual(contacts[10]);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.removeUser(user)', () => {
        beforeEach(() => {
            $httpBackend.whenDELETE(FIREBASE_URI + '/contacts/11.json' + FIREBASE_SECRET).respond(null);
        });

        it('should remove the contact with id "11"', (done) => {
            ContactsService.removeUser({id: "11"}).then((responseData) => {
                expect(responseData).toBe(null);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.updateUser(user)', () => {
        beforeEach(() => {
            $httpBackend.whenPUT(FIREBASE_URI + '/contacts/11.json' + FIREBASE_SECRET).respond(contacts[11]);
        });

        it('should update the contact with id "11"', (done) => {
            ContactsService.updateUser({id: "11"}).then((user) => {
                expect(user).toEqual(contacts[11]);
                done();
            });

            $httpBackend.flush();
        });
    });
});