
import * as angular from 'angular';
import * as $ from 'jquery';
import { CellService } from "./CellModel";
import { IAction } from "../core/core.actions";
import { CellComponent } from "./Cell";
import { BoardComponent } from "./Board";

class DroppableCellDirective implements ng.IDirective {
    restrict: string = "A";
    replace : boolean = true;
    require : Array<string> = ["^^gameBoard", "^gameCell"];
    
    private handlers : { [id: string] : IAction } = {};  
    private compiler : ng.ICompileService = null;           
    
    constructor ($compile: ng.ICompileService) {
        this.compiler = $compile;
    } 
    
    link (scope : ng.IScope, element : ng.IAugmentedJQuery, attrs : ng.IAttributes, ctrl: any) {
        let boardCtrl = ctrl[0];
        let cellCtrl  = ctrl[1];
        
        $(element).droppable({
            tolerance: "pointer",
            hoverClass: "hover-drop",
            greedy: true,
            drop:(evt: any, ui: any) => {
                boardCtrl.userCancel(false);
                boardCtrl.incrementStep();
                var draggedNumber = ui.draggable.data('shownValue');
                cellCtrl.changeShownValue(draggedNumber);
                return false;
            },
            out: (evt: any, ui: any) => {
                $(this).removeClass('drag-mouse-over');
            }
        });
    }
    
    static factory () : ng.IDirectiveFactory {
        let instance = ($compile: ng.ICompileService) => new DroppableCellDirective($compile);
        instance.$inject = ["$compile"];
        return instance;
    } 
}
export { DroppableCellDirective };