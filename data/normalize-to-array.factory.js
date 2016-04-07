"use strict";
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