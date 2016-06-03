'use strict';

let pageMaskComponent = {
    bindings: {},
    template: `<div class="shared_pageMask"
                    ng-class="{open: $ctrl.isPageMaskOpened()}"></div>`,
    controller: PageMaskController
};

PageMaskController.$inject = ['PageMaskService'];
function PageMaskController (PageMaskService) {

    this.isPageMaskOpened = () => PageMaskService.isOpened;
}

export default pageMaskComponent;