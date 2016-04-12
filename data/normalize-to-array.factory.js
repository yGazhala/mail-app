"use strict";
// The application data were saved at the FireBase as array of objects.
// But there is some particularity in the FireBase REST API:
// if we will add the new object to our data, the array
// will be converted to collection. Then in response.data we will
// receive this collection instead of array. To continue working with
// array we are using this factory.

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