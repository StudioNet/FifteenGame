/// <reference path="/Scripts/jquery-1.8.2.js" />
/// <reference path="/Scripts/angular.js" />

var cellViewModel = function (number, rIdx, cIdx) {
    var self = this;    
    self.cellnumber = number;
    self.rowIdx = rIdx;
    self.cellIdx = cIdx;

    self.draggingTempl = function (value) {
        return "<div class='div-row-cell digit' draggable='true'><span>" + value + "</span></div>";
    };
    self.droppingTempl = function () {
        return "<div class='div-row-cell empty' droppable=''><span></span></div>";
    };
};

/*Main game module*/
//angular.module('gameui', ['ui.bootstrap']);
var main = angular.module('fifteenGame', ['ui.bootstrap']);

/*UI Controller*/
main.controller('uiController', ['$scope', function($scope) {

    $scope.nick = "";

}]);


/*Game controller*/
main.controller('fifteenGameController', ['$scope', function ($scope) {

    //Game board object
    var BoardGame = function () {
        var self = this;

        //Global scope properties
        self.cancelMovedByGamer = true;
        self.$boardScope = $scope;
        self.$boardScope.stepsCounter = 0;

        //Private Methods 
        function takeIndexRandomly(from, to) {
            return Math.floor(Math.random() * (1 + to - from));
        };

        function spliceRange(range, position) {
            if (range.length > 0 && position > -1) {
                range.splice(position, 1);
            }
        };

        function letEmptyIndex() {
            var emptyCell = null;
            angular.forEach(self.$boardScope.board, function (row, rowIdx) {
                angular.forEach(row, function (cell, cellIdx) {
                    if (cell.cellnumber == "") {
                        emptyCell = cell;
                    }
                });
            });
            return emptyCell;
        };

        //Public Methods
        self.build = function () {
            var range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            self.$boardScope.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            //debugger;
            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++) {
                    var idx = takeIndexRandomly(0, range.length - 1);
                    if (range[idx] == 0) {
                        self.$boardScope.board[row][col] = new cellViewModel("", row, col);
                    } else {
                        self.$boardScope.board[row][col] = new cellViewModel(range[idx], row, col);
                    }
                    spliceRange(range, idx);
                }
            }
        };

        self.canMoved = function (cell) {
            //debugger;
            var empty = letEmptyIndex();
            //vertical moving
            if (Math.abs(empty.rowIdx - cell.rowIdx) == 1 && (empty.cellIdx - cell.cellIdx) == 0) {
                return true;
            }

            //horizontal moving
            if (Math.abs(empty.cellIdx - cell.cellIdx) == 1 && (empty.rowIdx - cell.rowIdx) == 0) {
                return true;
            }
            return false;
        };

        self.changeEmpty = function (cell) {
            cell.cellnumber = "";
            self.$boardScope.board[cell.rowIdx][cell.cellIdx] = cell;
            self.$boardScope.$apply();
        };
    };

    //public board game object
    $scope.Board = new BoardGame();


    $scope.reorderBoard = function () {
        $scope.stepsCounter = 0;
        $scope.Board.build();
    };

    //first time created board
    $scope.Board.build();

} ]);

main.directive("gamecell", function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            value: '='
        },
        link: function (scope, element, attrs) {
            //debugger;
            var htmlTempl = "";
            if (angular.isNumber(scope.value)) {
                htmlTempl = scope.$parent.cell.draggingTempl(scope.value);
            }
            else {
                htmlTempl = scope.$parent.cell.droppingTempl();
            }
            var template = angular.element($compile(htmlTempl)(scope));
            element.html(template);
        }
    };
});

main.directive("draggable", function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //debugger;
            var self = this;
            self.boardScope = scope.$parent.$parent.$parent;
            self.draggedElement = element;

            var draggingHandlers = {
                mouseOverOnMovedCell: function (evt) {
                    if (self.boardScope.Board.canMoved(scope.$parent.cell)) {
                        element.addClass("drag-mouse-over");
                    }
                },
                mouseOutMovedCell: function () {
                    element.removeClass("drag-mouse-over");
                },
                dragStartHandler: function (evt) {
                    //debugger;
                    //Validation of moved cell 
                    if (self.boardScope.Board.canMoved(scope.$parent.cell)) {
                        element.addClass("drag-element");
                        evt.originalEvent.dataTransfer.effectAllowed = "move";
                        evt.originalEvent.dataTransfer.setData("text", angular.toJson(scope.value));
                        return true;
                    }
                    return false;
                },
                dragEndHandler: function (evt) {
                    //debugger;
                    element.removeClass("drag-element");
                    if (!self.boardScope.Board.cancelMovedByGamer) {
                        //debugger;
                        self.boardScope.Board.changeEmpty(scope.$parent.cell);
                        self.boardScope.Board.cancelMovedByGamer = true;
                        
                        //create new droppable element
                        var htmlTemplDrop = scope.$parent.cell.droppingTempl();
                        var templateDrop = angular.element($compile(htmlTemplDrop)(scope));
                        element.replaceWith(templateDrop);
                        //set to empty cell

                    }
                }
            };
            self.draggedElement.attr("draggable", true);
            self.draggedElement.bind("dragstart", draggingHandlers.dragStartHandler);
            self.draggedElement.bind("dragend", draggingHandlers.dragEndHandler);
            self.draggedElement.bind("mouseover", draggingHandlers.mouseOverOnMovedCell);
            self.draggedElement.bind("mouseout", draggingHandlers.mouseOutMovedCell);
        }
    };
});

main.directive("droppable", function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var self = this;
            self.boardScope = scope.$parent.$parent.$parent;
            self.droppedElement = element;
            //debugger;
            var dragAndDropHandlers = {
                leaveDragHandler: function (evt) {
                    self.droppedElement.removeClass("drag-enter");
                    self.droppedElement.removeClass("drag-over");
                    self.droppedElement.addClass("div-row-cell digit");
                },
                enterDragHandler: function (evt) {
                    self.droppedElement.addClass("drag-enter");
                    return false;
                },
                overDragHandler: function (evt) {
                    self.droppedElement.addClass("drag-over");
                    return false;
                },
                droppedHandler: function (evt) {
                    //debugger;
                    //if dropped handler couses player made a move
                    self.boardScope.Board.cancelMovedByGamer = false;
                    self.boardScope.stepsCounter++;
                    //Read dropped cell info
                    var elementData = evt.originalEvent.dataTransfer.getData("text");
                    var draggedNumber = angular.fromJson(elementData);

                    //create new draggable element
                    var htmlTempl = scope.$parent.cell.draggingTempl(draggedNumber);
                    scope.value = draggedNumber;
                    var template = angular.element($compile(htmlTempl)(scope));
                    element.replaceWith(template);
                    return false;
                }
            };
            self.droppedElement.bind("dragleave", dragAndDropHandlers.leaveDragHandler);
            self.droppedElement.bind("dragenter", dragAndDropHandlers.enterDragHandler);
            self.droppedElement.bind("dragover", dragAndDropHandlers.overDragHandler);
            self.droppedElement.bind("drop", dragAndDropHandlers.droppedHandler);
        }
    };
});

