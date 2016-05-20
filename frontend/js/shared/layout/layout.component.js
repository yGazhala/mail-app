'use strict';
import template from './layout.html';

let layoutComponent = {
    bindings: {},
    template: template,
    controller: LayoutController
};

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
            }, 300);
        }
    }
}

export default layoutComponent;