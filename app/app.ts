/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jqueryui/index.d.ts"/>
/// <reference path="../node_modules/@types/node/index.d.ts"/>

//Cross javascript libs
// debugger;
window['jQuery'] = require('../node_modules/jquery/dist/jquery');
require('../node_modules/jquery-ui-dist/jquery-ui');
//workarround for new bootstrap [4 alpha]
window['Tether'] = require('../node_modules/tether/dist/js/tether');    
require('../node_modules/bootstrap/dist/js/bootstrap');

//Cross styling scss
require('./assets/styles/app.scss');


import {Container} from './layout/MainContainer';

(() => {
    'use strict';
    new Container().start();
})();