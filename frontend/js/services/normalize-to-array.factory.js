"use strict";
// The application data were stored at the FireBase as an array of objects.
// But there is some particularity in the FireBase REST API:
// when we add the new object to our data, the array
// will be converted to the collection of objects.
// Then in response.data we will receive the object instead of the array.
// To continue working with the array we will use this factory.

export default function NormalizeToArrayFactory() {

    return function(object) {
        if(!object) return [];

        return Object.keys(object).map(key => {
            let normalizedObject = object[key];
            // save the key in the id property
            normalizedObject.id = key;

            return normalizedObject;
            });
    };
}