'use strict';
import angular from ''
const core = angular
    .module('core', [
        'shared',
        'mailBox',
        'contacts',
        'auth'
    ]);

export default core;
