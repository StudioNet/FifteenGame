import * as angular from 'angular';
import {IBoardService, BoardService} from "./BoardService";
import { ICell } from "./CellModel";

export class BoardController implements ng.IComponentController {
    boardViewModel: BoardController;
    boardSrv: IBoardService = null;
    board: Array<Array<ICell>> = [];

    static $inject=['$scope', 'BoardService'];
    constructor(public $scope: ng.IScope, boardService: BoardService) {
        this.boardViewModel = this;
        this.boardSrv = boardService;
    }

    userCancel(movingCancelation: boolean) {
        if(movingCancelation !== undefined)
            this.boardSrv.movingCancelationByUser = movingCancelation;
        return this.boardSrv.movingCancelationByUser; 
    };

    incrementStep() {
        this.boardSrv.stepCounter++;
    };

    public $onInit() {
       this.board = this.boardSrv.build();
    }

    canMoved(cell: ICell): boolean {
       return this.boardSrv.canMoved(cell); 
    }

    changeEmpty(cell: ICell) {
        this.boardSrv.changeEmpty(cell);
    }
}   

export class BoardComponent implements ng.IComponentOptions {
    controllerAs: string;  
    controller: any; 
    template: string; 
    transclude: boolean; 
    bindings: { [binding: string]: string; }; 

    constructor() {
        this.bindings = {
            boardId: "@",
            styles: "@"
        };
        this.template = 
            `<div id="{{boardViewModel.boardId}}" class="{{boardViewModel.styles}}">
                <div class="div-table-row" ng-repeat="row in boardViewModel.board track by $index">
                    <game-cell ng-repeat="cell in row track by $index"
                                current="cell"
                                shown-value="{{cell.shownValue}}">
                    </game-cell>
                </div>
            </div>`;
        this.controllerAs = "boardViewModel";
        this.controller = BoardController;
    }
}     

// export { BoardComponent, BoardController };