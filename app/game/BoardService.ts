import * as angular from 'angular';
import {CellService, ICell} from "./CellModel";

interface IBoardService {
    movingCancelationByUser: boolean;
    movingCancelationByToken: boolean;
    stepCounter: number;
    build(): Array<Array<ICell>>;
    canMoved(cell: ICell) : boolean;
    changeEmpty(cell: ICell): void;
}
    
class BoardService implements IBoardService {
    /**
     */
    private GAME_RANGE : Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    /**
     */
    private BASE_BOARD : Array<Array<ICell>> = [[], [], [], []];

    movingCancelationByUser: boolean = false;
    movingCancelationByToken: boolean = false;
    stepCounter: number = 0;
    board: Array<Array<ICell>>;

    constructor() {}
    
    private takeIndexRandomly(from: number, to: number) {
        return Math.floor(Math.random() * (1 + to - from));
    };
    
    private spliceRange(range: Array<number>, position: number) {
        if (range.length > 0 && position > -1) {
            range.splice(position, 1);
        }
    };
    
    private letEmptyIndex() : ICell {
        let emptyCell: ICell = null;
        
        angular.forEach(this.board, (row: number, rowIdx: number) => {
            angular.forEach(row, (cell: ICell, cellIdx: number) => {
                if (cell.shownValue == "") {
                    emptyCell = cell;
                }
            });
        });
        return emptyCell;
    };
    
    build() {
        const cols = 4;
        const rows = 4;
        let currentRange = angular.copy(this.GAME_RANGE);
        this.board = angular.copy(this.BASE_BOARD);
        
        for(var row = 0; row < rows; row++) {
            for(var col = 0; col < cols; col++) {
                var idx = this.takeIndexRandomly(0, currentRange.length - 1);
                if(currentRange[idx] === 0) {
                    this.board[row][col] = new CellService(col, row, "");
                }
                else {
                    this.board[row][col] = new CellService(col, row, currentRange[idx].toString());
                }
                this.spliceRange(currentRange, idx);
            } 
        }

        return this.board;
    }
    
    canMoved(cell: ICell) {
        const STEP_ONE = 1;
        const STEP_ZERO = 0;
        
        let empty = this.letEmptyIndex();
        /**
         * Vertical moving validation */
        if(Math.abs(empty.rowIdx - cell.rowIdx) == STEP_ONE 
            && Math.abs(empty.columnIdx - cell.columnIdx) == STEP_ZERO){
            return true;        
        }
        
        /**
         * Horisontal moving validation */
        if(Math.abs(empty.columnIdx - cell.columnIdx) == STEP_ONE 
            && Math.abs(empty.rowIdx - cell.rowIdx) == STEP_ZERO) {
            return true;        
        }
        
        return false;
    }

    changeEmpty(cell: ICell) {
        cell.shownValue = "";
        this.board[cell.rowIdx][cell.columnIdx] = cell;
    }
}
    
export {IBoardService, BoardService };