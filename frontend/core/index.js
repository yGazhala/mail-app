'use strict';
// This module includes entire application

import angular from 'angular';

import shared from '../shared';
import auth from '../auth';
import mailBox from '../mail-box';
import contacts from '../contacts';
import services from '../services';


export default angular
    .module('core', [
        services.name,
        shared.name,
        auth.name,
        mailBox.name,
        contacts.name
    ]);
