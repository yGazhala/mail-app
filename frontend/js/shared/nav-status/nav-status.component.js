'use strict';

let navStatusComponent = {
    bindings: {},
    template: `<div class="navStatus_bar" ng-if="$ctrl.currentNavStatus">
                    <p>{{$ctrl.currentNavStatus}}</p></div>`,
    controller: NavStatusController
};

NavStatusController.$inject = ['NavStatusService'];
function NavStatusController(NavStatusService) {

    this.currentNavStatus = NavStatusService.getStatus();
}

export default navStatusComponent;
