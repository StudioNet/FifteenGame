import * as angular from 'angular';

interface ICell {
    columnIdx : number;
    rowIdx : number;
    shownValue : any;
}
   
class CellService implements ICell {
    columnIdx : number;
    rowIdx : number;
    shownValue : string;

    constructor(column : number, row: number, value: string) {
        this.columnIdx = column;
        this.rowIdx = row;
        this.shownValue = value;
    }
    
    public changeShownValue(value: string){
        if(angular.isDefined(value) && angular.isString(value)) {
            this.shownValue = value;
        }
    }
    
    static cellTemplate(viewValue: number) {
        return "<div class='div-row-cell digit' fg-draggable='true'><span>" 
                + viewValue.toString() + 
                "</span></div>";
    }; 
    
    static emptyTemplate() {
        return "<div class='div-row-cell empty' fg-droppable=''><span></span></div>";
    };
}

export {ICell, CellService};