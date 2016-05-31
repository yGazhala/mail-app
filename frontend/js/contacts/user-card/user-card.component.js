'use strict';
import template from './user-card.html';

let userCardComponent = {
    bindings: {
        updateUser: '&', // callback to parent contacts-list component
        selectedUser: '<' // get data from state controller
    },
    template,
    controller: UserCardController
};

/*@ngInject*/
function UserCardController($state) {
    // Helper method for determining when to show the user card.
    // When state will be "user-card", it will allow "ng-if" directive
    // at the template to show the user card.
    this.isUserCardAllowed = function() {
        return $state.is('user-card');
    }
}

export default userCardComponent;