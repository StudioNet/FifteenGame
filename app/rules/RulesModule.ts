/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>

import * as angular from 'angular';
import {RulesPageComponent} from './components/RulesPage'

export /**
 * RulesModule
 */
class RulesModule {
    public me: ng.IModule;
    public name: string = "fifteen.rules";

    /**
     *
     */
    constructor() {
        
        this.me = angular.module(this.name, []);

        this.me.component("rulesPage", new RulesPageComponent());

        this.me.config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state('fifteen.rules', {
                url: 'rules',
                views: {
                    'content@fifteen': {
                        template: "<rules-page></rules-page>"
                    }
                }
            })
        });
        
    }
    
}