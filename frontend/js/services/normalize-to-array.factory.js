"use strict";
// The application data were stored at the Firebase as a map object
// with a simple key/value pair. To continue working with an array
// on the client side, we transform the data received from the server by this factory.

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