"use strict";
// There is some strange behavior in FireBase REST api.
// If we will add the new object to array stored at FireBase,
// FireBase will return response.data with object instead of array.
// That's why, we need this factory.

angular
    .module('services')
    .factory('NormalizeToArrayFactory', NormalizeToArrayFactory);

function NormalizeToArrayFactory() {

    return function(object) {
        if(!object) return [];

        return Object.keys(object).map(key => {
            let normalizedObject = object[key];
            normalizedObject.id = key;

            return normalizedObject;
            });
    };
}