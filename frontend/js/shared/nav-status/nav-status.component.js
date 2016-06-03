'use strict';

let navStatusComponent = {
    bindings: {},
    template: `<div class="navStatus_bar" ng-if="$ctrl.currentNavStatus">
                    <p>{{$ctrl.currentNavStatus}}</p></div>`,
    controller: NavStatusController
};

/* @ngInject */
function NavStatusController(NavStatusService) {
    this.currentNavStatus = NavStatusService.getStatus();
}

export default navStatusComponent;
