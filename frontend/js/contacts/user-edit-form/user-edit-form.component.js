'use strict';
import template from './user-edit-form.html';

let userEditFormComponent = {
    bindings: {
        selectedUser: '<', // get data from parent user-card component
        updateUser: '&' // callback to contacts-list component
    },
    template
};

export default userEditFormComponent;