'use strict';
import template from './layout.html';

let layoutComponent = {
    bindings: {},
    template: template,
    controller: LayoutController
};

LayoutController.$inject = ['PageMaskService', '$timeout'];
function LayoutController(PageMaskService, $timeout) {
    this.isPageMaskOpened = () => PageMaskService.isOpened;

    this.isSideBarOpened = false;

    this.openSideBar = () => {
        this.isSideBarOpened = true;
        PageMaskService.open();
    };

    this.closeSideBar = () => {
        if(this.isSideBarOpened) {
            $timeout(()=> {
                this.isSideBarOpened = false;
                PageMaskService.close();
            }, 200);
        }
    };
}

export default layoutComponent;