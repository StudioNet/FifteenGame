
import * as angular from 'angular';
import * as $ from 'jquery';
import { CellService } from "./CellModel";
import { IAction } from "../core/core.actions";
import { CellComponent } from "./Cell";
import { BoardComponent } from "./Board";


class DraggableCellDirective implements ng.IDirective {
    
    restrict: string = "A";
    replace : boolean = true;
    require : Array<string> = ["^^gameBoard", "^gameCell"];
    
    private handlers : { [id: string] : Function } = {};  
    private compiler : ng.ICompileService = null;           
    
    constructor ($compile: ng.ICompileService) {
        this.compiler = $compile;
    } 
    
    link (scope : ng.IScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes, ctrl: any) {
        let boardCtrl = ctrl[0];
        let cellCtrl  = ctrl[1];

        $(element).draggable({
            snap: true,
            snapMode: "outer",
            stack: "[fg-droppable='']",
            drag: (evt: any, ui: any) => {
                if(boardCtrl.canMoved(cellCtrl.me())) {
                    element.addClass("drag-mouse-over");
                }   
            },
            stop: (evt: any, ui: any) => {
                element.removeClass("drag-element");
                if(!boardCtrl.userCancel()) {
                    boardCtrl.changeEmpty(cellCtrl.me());
                    boardCtrl.userCancel(true);
                }
            },
            start: (evt: any, ui: any) => {
                if(boardCtrl.canMoved(cellCtrl.me())) {
                    element.addClass("drag-element");
                    $(element).data('shownValue', cellCtrl.me().shownValue);    
                    return true;
                }    
                return false;
            }

        });
    }  
            
    static factory () : ng.IDirectiveFactory {
        let instance = ($compile: ng.ICompileService) => new DraggableCellDirective($compile);
        instance.$inject = ["$compile"];
        return instance;
    }
}

export { DraggableCellDirective };