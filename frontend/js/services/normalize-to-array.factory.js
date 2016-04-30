"use strict";
// The application data were stored at the FireBase as an array of objects.
// But there is some particularity in the FireBase REST API:
// when we add the new object to our data, the array
// will be converted to the object as a collection.
// Then in response.data we will receive this object instead of the array.
// To continue working with an array we will use this factory.

export default function NormalizeToArrayFactory() {

    return function(object) {
        if(!object) return [];

        return Object.keys(object).map(key => {
            let normalizedObject = object[key];
            normalizedObject.id = key;

            return normalizedObject;
            });
    };
}