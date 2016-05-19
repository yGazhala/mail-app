'use strict';
import template from './layout.html';

let layoutComponent = {
    bindings: {},
    template: template,
    controller: LayoutController
};

function LayoutController(PageMaskService) {
    this.isPageMaskOpened = () => PageMaskService.isOpened;
}

export default layoutComponent;