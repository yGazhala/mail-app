'use strict';

describe('NormalizeToArrayFactory', () => {

    beforeEach(angular.mock.module('services'));

    it('should return an array of objects from a collection of objects',
        angular.mock.inject((NormalizeToArrayFactory) => {
            expect(NormalizeToArrayFactory({
                    '1': {userName: 'John'},
                    '2': {userName: 'Tom'}
                }))
            .toEqual([
                    {id: '1', userName: 'John'},
                    {id: '2', userName: 'Tom'}
                ]);
    }));
});