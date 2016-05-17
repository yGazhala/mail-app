'use strict';

let pageMaskComponent = {
    bindings: {},
    template: `<div class="shared_pageMask"
                    ng-class="{open: $ctrl.isPageMaskOpened()}"></div>`,

    controller: function(PageMaskService) {
        this.isPageMaskOpened = () => PageMaskService.isOpened;
    }
};

export default pageMaskComponent;