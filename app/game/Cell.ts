/// <reference path="../../node_modules/@types/angular/index.d.ts"/>
/// <reference path="../../node_modules/@types/angular-material/index.d.ts"/>

import * as angular from 'angular';
import { CellService, ICell } from "./CellModel";

class CellController implements ng.IComponentController {
    cellViewModel: CellController;
    emptyValue: string = "";
    
    static $inject=['$scope'];
    constructor(public $scope: ng.IScope) {
        this.cellViewModel = this;
    }

    me(): ICell {
        return this.cellViewModel['current'];
    }

    changeShownValue(newValue: string) {
        this.cellViewModel['current'].changeShownValue(newValue);
        this.$scope.$apply();
    }

    $onChanges(changesObj: any) {
        //debugger;
        if(changesObj['current'])
            this.cellViewModel['current'] = changesObj['current'].currentValue;
        if(changesObj['shownValue'])
            this.cellViewModel['shownValue'] = changesObj['shownValue'].currentValue;
    }
}

class CellComponent implements ng.IComponentOptions {
    controllerAs: string;  
    controller: any; 
    template: string; 
    bindings: { [binding: string]: string; }; 

    constructor() {
        this.bindings = {
            shownValue: "@",
            current: "<"
        };
        this.template = `
            <div ng-if="cellViewModel.shownValue !== cellViewModel.emptyValue" class='div-row-cell digit' fg-draggable='true'>
                <div>{{cellViewModel.shownValue}}</div>
            </div>
            <div ng-if="cellViewModel.shownValue === cellViewModel.emptyValue" class='div-row-cell empty' fg-droppable=''>
                <div>&nbsp;</div>
            </div>
        `;
        this.controllerAs = "cellViewModel";
        this.controller = CellController;
    }
}
    
export {CellComponent, CellController};
