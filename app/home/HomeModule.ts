/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>

'use strict';
import * as angular from 'angular';
import {HomePageComponent} from './components/HomePage'

export class HomeModule {
    public me: ng.IModule;
    public name:  string = "home";

    constructor() {
        this.me = angular.module(this.name, []);

        this.me.component("homePage", new HomePageComponent());

        this.me.config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state("fifteen.home", {
                url: 'home',
                views: {
                    'content@fifteen': {
                        template: "<home-page></home-page>"
                    }
                }
            })
        });
    }
}



