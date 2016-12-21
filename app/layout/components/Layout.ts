/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

/**
 * LayoutController - main controller responsible to manage wide layout of our application 
 */
class LayoutController implements ng.IComponentController {}

export class LayoutComponent implements ng.IComponentOptions {
    controllerAs: string = "layoutViewModel";
    controller = LayoutController;
    template: string = `
        <div id="topbar" ui-view="topbar"></div>
        <div id="sidebar" ui-view="sidebar"></div>
        <div class="wrapper">
        	<div class="container-fluid">
        		<div class="row">
        			<div class="col-xs-12">
        		   		<div id="content" ui-view="content"></div>
        		   	</div>
        		</div>
        	</div>
        </div>
    `;
}