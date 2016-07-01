'use strict';

import mockMails from '../mocks/mock-mails.js';

describe('MailDataService', () => {
    let mails = mockMails;
    let MailDataService, NormalizeToArrayFactory, $httpBackend, FIREBASE_URI, FIREBASE_SECRET;

    beforeEach(angular.mock.module('services'));
    beforeEach(angular.mock.inject((_MailDataService_, _NormalizeToArrayFactory_, _$httpBackend_, _FIREBASE_URI_, _FIREBASE_SECRET_) => {
        MailDataService = _MailDataService_;
        NormalizeToArrayFactory = _NormalizeToArrayFactory_;
        FIREBASE_URI = _FIREBASE_URI_;
        FIREBASE_SECRET = _FIREBASE_SECRET_;
        $httpBackend = _$httpBackend_;
    }));

    describe('.getBox(boxId)', () => {
        beforeEach(() => {
            $httpBackend.whenGET(FIREBASE_URI + '/inbox.json' + FIREBASE_SECRET).respond(mails.inbox);
        });

        it('should get a concrete mailbox', (done) => {
            MailDataService.getBox('inbox').then((mailbox) => {
                expect(mailbox).toEqual(NormalizeToArrayFactory(mails.inbox));
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.getMessage(boxId, messageId)', () => {
        beforeEach(() => {
            $httpBackend.whenGET(FIREBASE_URI + '/sent-mail/1.json' + FIREBASE_SECRET).respond(mails.sentMail[1]);
        });

        it('should get a concrete message from a concrete box', (done) => {
            MailDataService.getMessage('sent-mail', '1').then((message) => {
                expect(message).toEqual(mails.sentMail[1]);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.addNewMessageToSentMail(message)', () => {
        let testMessage = {id: "10", content: "test"};

        beforeEach(() => {
            $httpBackend.whenPOST(FIREBASE_URI + '/sent-mail.json' + FIREBASE_SECRET).respond({name: "10"});
            $httpBackend.whenPUT(FIREBASE_URI + '/sent-mail/10.json' + FIREBASE_SECRET).respond(testMessage);
        });

        it('should add a new message to the sent mail', (done) => {
            MailDataService.addNewMessageToSentMail({content: "test"}).then((message) => {
                expect(message).toEqual(testMessage);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.addMessageToTrash(message)', () => {
        let testMessage = {id: "10", content: "test"};

        beforeEach(() => {
            $httpBackend.whenPOST(FIREBASE_URI + '/trash.json' + FIREBASE_SECRET).respond({name: "10"});
            $httpBackend.whenPUT(FIREBASE_URI + '/trash/10.json' + FIREBASE_SECRET).respond(testMessage);
        });

        it('should add a message to the trash', (done) => {
            MailDataService.addMessageToTrash({content: "test"}).then((message) => {
                expect(message).toEqual(testMessage);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.addMessage(message)', () => {
        let testMessage = {id: "10", boxId: "inbox", content: "test"};

        beforeEach(() => {
            $httpBackend.whenPOST(FIREBASE_URI + '/inbox.json' + FIREBASE_SECRET).respond({name: "10"});
            $httpBackend.whenPUT(FIREBASE_URI + '/inbox/10.json' + FIREBASE_SECRET).respond(testMessage);
        });

        it('should add a message with a boxId to the original mailbox', (done) => {
            MailDataService.addMessage({boxId: 'inbox', content: "test"}).then((message) => {
                expect(message).toEqual(testMessage);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.removeMessage(message)', () => {
        beforeEach(() => {
            $httpBackend.whenDELETE(FIREBASE_URI + '/inbox/10.json' + FIREBASE_SECRET).respond(null);
        });

        it('should remove a concrete message from a concrete box', (done) => {
            MailDataService.removeMessage({id: "10", boxId: "inbox"}).then((responseData) => {
                expect(responseData).toEqual(null);
                done();
            });

            $httpBackend.flush();
        });
    });

    describe('.removeMessageFromTrash(message)', () => {
        beforeEach(() => {
            $httpBackend.whenDELETE(FIREBASE_URI + '/trash/10.json' + FIREBASE_SECRET).respond(null);
        });

        it('should remove a concrete message from the trash', (done) => {
            MailDataService.removeMessageFromTrash({id: "10", boxId: "inbox"}).then((responseData) => {
                expect(responseData).toEqual(null);
                done();
            });

            $httpBackend.flush();
        });
    });
});