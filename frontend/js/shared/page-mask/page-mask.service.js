'use strict';

export default function PageMaskService() {
    this.isOpened = false;

    this.toggle = function() {
        this.isOpened = !this.isOpened;
    };

    this.open = function() {
        if (this.isOpened === false) {
            this.isOpened = true;
        }
    };

    this.close = function() {
        if (this.isOpened === true) {
            this.isOpened = false;
        }
    };
}