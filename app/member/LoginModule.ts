/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>

'use strict';
import * as angular from 'angular';

export class LoginModule {
    public me: ng.IModule;
    public name: string = "member.login";

    constructor() {
        this.me = angular.module(this.name, []);

        this.me.config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state('fifteen.login', {
                url: 'login', 
                views: {
                    'main@': {
                        template: "<base-layout></base-layout>"
                    },
                    'content@fifteen.login': {
                        templateUrl: "/app/member/views/login.html"
                    }
                }
            })
        });
        
    }
}