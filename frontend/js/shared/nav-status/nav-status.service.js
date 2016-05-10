'use strict';

export default function NavStatusService() {
    let currentNavStatus = null;

    this.getStatus = () => currentNavStatus;

    this.setStatus = (status) => currentNavStatus = status;
}
