/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

class RulesPageController implements ng.IComponentController {
    public pageTitle: string = "Rules of Fifteen Puzzle Game";
}

export class RulesPageComponent implements ng.IComponentOptions {
    controllerAs: string = "rulesViewModel";
    controller = RulesPageController;
    template: string = `
        <div class="box">
        	<div class="box-header">
        		<h2>{{rulesViewModel.pageTitle}}</h2>
        	</div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="list-group"> 
                            <li class="list-group-item list-group-item-action">
                                <span class="tag tag-default tag-pill float-xs-left">1</span>
                                <span>&nbsp;&nbsp;You need to arrange the numbers on board by simple mathematical order.</span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <span class="tag tag-default tag-pill float-xs-left">2</span>
                                <span>&nbsp;&nbsp;Slots can only move vertically or horizontally to an adjacent empty slot.</span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <span class="tag tag-default tag-pill float-xs-left">3</span>
                                <span>&nbsp;&nbsp;Game over when board is organized from 1 to 15</span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <span class="tag tag-default tag-pill float-xs-left">4</span>
                                <span>&nbsp;&nbsp;No more ;-)</span>
                            </li>
                        </ul>          
                    </div>
                </div>
            </div>
        </div>
    `;
}