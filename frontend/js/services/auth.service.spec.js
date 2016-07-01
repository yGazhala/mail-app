'use strict';

describe('AuthService', () => {
    let AuthService;

    beforeEach(angular.mock.module('services'));

    beforeEach(angular.mock.inject((_AuthService_)=>{
        AuthService = _AuthService_;

        spyOn(AuthService._authObj, '$authWithPassword');
        spyOn(AuthService._authObj, '$unauth');
        spyOn(AuthService._authObj, '$requireAuth');
        spyOn(AuthService._authObj, '$waitForAuth');
    }));

    it('should call Firebase $authWithPassword()', () => {
        AuthService.authWithPassword();
        expect(AuthService._authObj.$authWithPassword).toHaveBeenCalled();
    });

    it('should call Firebase $unauth()', () => {
        AuthService.logout();
        expect(AuthService._authObj.$unauth).toHaveBeenCalled();
    });

    it('should call Firebase $requireAuth()', () => {
        AuthService.requireAuth();
        expect(AuthService._authObj.$requireAuth).toHaveBeenCalled();
    });

    it('should call Firebase $waitForAuth()', () => {
        AuthService.waitForAuth();
        expect(AuthService._authObj.$waitForAuth).toHaveBeenCalled();
    });
});