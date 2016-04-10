"use strict";
// The application data were saved at the FireBase as array of objects.
// But there is some strange behavior in the FireBase REST API:
// if we will add the new object to the array, the array
// will be converted to the object. That's why, we need this factory.

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