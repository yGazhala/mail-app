'use strict';
import template from './add-user-form.html';

let addUserFormComponent = {
    bindings: {
        addNewUser: '&' // callbacks to parent contacts-list component
    },
    template,
    controller: AddUserFormController
};

AddUserFormController.$inject = ['PageMaskService'];
function AddUserFormController(PageMaskService) {
    this.closePageMask = function() {
        PageMaskService.close();
    }
}

export default addUserFormComponent;