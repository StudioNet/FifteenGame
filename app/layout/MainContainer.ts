/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>
'use strict';
import * as angular from 'angular';
import {LayoutComponent} from './components/Layout';
import {BaseLayoutComponent} from './components/BaseLayout';
import {TopBarComponent} from './components/TopAppBar';
import {SideBarComponent} from './components/SideAppBar';
import { GameModule } from '../game/GameModule';
import {HomeModule} from '../home/HomeModule';
import {RulesModule} from '../rules/RulesModule';
import {MemberModule} from '../member/MemberModule';

export class Container {
    public app: angular.IModule;
    public name: string = "fifteenGame";

    constructor() {
        this.app = angular.module(this.name, [
                'angularMoment',
                'ngResource',
                'ui.bootstrap',
                'ui.router',
                'toastr', 
                new GameModule().name,
                new HomeModule().name,
                new RulesModule().name,
                new MemberModule().name]);

        /**Register here all components what needed*/
        this.app.component("baseLayout", new BaseLayoutComponent())
        this.app.component("mainLayout", new LayoutComponent());
        this.app.component("topBar", new TopBarComponent());
        this.app.component("sideBar", new SideBarComponent());

        /**Register routes of application*/
        this.app.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) => {
            $locationProvider.html5Mode(true);

            $stateProvider.state('fifteen', {
                url: "/",
                views: {
                    "main" : {
                        template: "<main-layout></main-layout>"
                    },
                    "topbar@fifteen": {
                        template: "<top-bar></top-bar>"
                    },
                    "sidebar@fifteen": {
                        template: "<side-bar></side-bar>"
                    }
                }    
            });
        });
    }

    public start() {
        angular.element(document).ready(() => {angular.bootstrap(document, [this.name])});
    }
}