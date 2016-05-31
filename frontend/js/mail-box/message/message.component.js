'use strict';
import template from './message.html';

let messageComponent = {
    bindings: {
        message: '<' // get data from state controller
    },
    template: template
};

export default messageComponent;
