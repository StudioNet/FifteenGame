/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-animate/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts"/>

import * as angular from 'angular';
import { BoardComponent, BoardController } from './Board'; 
import { IBoardService, BoardService } from './BoardService';
import { CellComponent, CellController } from './Cell';
import { CellService } from './CellModel';
import { DraggableCellDirective } from './DraggableCell';
import { DroppableCellDirective } from './DroppableCell';
import {GamePageComponent} from './components/GamePage'

export class GameModule {
    private game: ng.IModule;
    public name: string = "fifteen.game";

    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    constructor() {
        this.game = angular.module(this.name, []);
        
        //register components
        this.game.component("gameBoard", new BoardComponent());
        this.game.component("gameCell", new CellComponent());
        this.game.component("gamePage", new GamePageComponent());

        //register services
        this.game.service("CellService", CellService);
        this.game.service("BoardService", BoardService);

        //register directives
        this.game.directive("fgDraggable", DraggableCellDirective.factory());
        this.game.directive("fgDroppable", DroppableCellDirective.factory());        

        //register routes
        this.game.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) => {
            $stateProvider.state('fifteen.game', {
                url: 'game',
                views: {
                    'content@fifteen': {
                        template: "<game-page></game-page>"
                    }
                }
            })
        });
    }
}