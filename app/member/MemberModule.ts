/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>

'use strict';
import * as angular from 'angular';
import { MemberPageComponent } from './components/MemberPage'
import { LoginModule } from './LoginModule'
import { RegisterModule } from './RegisterModule'

export class MemberModule { 
    public me: ng.IModule;
    public name: string = "fifteen.member";

    constructor() {
        this.me = angular.module(this.name, [
            new LoginModule().name,
            new RegisterModule().name
        ]);

        this.me.component("memberPage", new MemberPageComponent());

        this.me.config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state('fifteen.member', {
                url: 'member',
                views: {
                    'content@fifteen': {
                        template: "<member-page></member-page>"
                    }
                }
            })
        });            
    }
}
