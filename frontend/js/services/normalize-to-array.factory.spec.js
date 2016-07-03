'use strict';

describe('NormalizeToArrayFactory', () => {
    let NormalizeToArrayFactory;

    beforeEach(angular.mock.module('services'));
    beforeEach(angular.mock.inject((_NormalizeToArrayFactory_) => {
        NormalizeToArrayFactory = _NormalizeToArrayFactory_;
    }));

    it('should return an array of objects', () => {
        expect(NormalizeToArrayFactory({
            '1': {userName: 'John'},
            '2': {userName: 'Tom'}
        }))
        .toEqual([
            {id: '1', userName: 'John'},
            {id: '2', userName: 'Tom'}
        ]);
    });

    it('should return an empty array', () => {
        expect(NormalizeToArrayFactory({})).toEqual([]);
    })
});