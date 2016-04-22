'use strict';
// This module includes entire application

import angular from 'angular';

import shared from '../shared';
import auth from '../auth';
import mailBox from '../mail-box';
import contacts from '../contacts';

export default angular
    .module('core', [
        shared.name,
        auth.name,
        mailBox.name,
        contacts.name
    ]);
