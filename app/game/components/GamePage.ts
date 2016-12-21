/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

class GamePageController implements ng.IComponentController {
    public pageTitle: string = "Start it play;";
}

export class GamePageComponent implements ng.IComponentOptions {
    controllerAs: string = "gamePageViewModel";
    controller = GamePageController;
    template: string = `
        <div class="box">
        	<div class="box-header">
        		<h2>{{gamePageViewModel.pageTitle}}</h2>
        	</div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-12">
                        <game-board board-id=\"fiftenBoard\" styles=\"board\"></game-board>
                    </div>
                </div>
            </div>
        </div>
    `;
}
 