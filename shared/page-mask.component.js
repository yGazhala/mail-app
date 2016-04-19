'use strict';
angular
    .module('shared')
    .component('pageMask', {
        bindings: {},

        template: `<div class="mailApp__pageMask"
                        ng-class="{open: $ctrl.isPageMaskOpened()}"></div>`,

        controller: function(PageMaskService) {
            this.isPageMaskOpened = function() {

                return PageMaskService.isOpened;
            }
        }
    });