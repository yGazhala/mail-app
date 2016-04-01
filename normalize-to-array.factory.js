"use strict";
angular
    .module('mailApp')
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