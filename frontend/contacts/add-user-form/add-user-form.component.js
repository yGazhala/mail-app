'use strict';
import template from './add-user-form.html';

let addUserFormComponent = {
    bindings: {
        addNewUser: '&' // callback to parent contacts-list component
    },
    template: template,
    controller: AddUserFormController
};

function AddUserFormController(PageMaskService) {
    this.closePageMask = function() {
        PageMaskService.close();
    }
}

export default addUserFormComponent;