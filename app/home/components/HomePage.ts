/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

class HomePageController implements ng.IComponentController {
    public pageTitle: string = "Hello, We glad to see you between our gamers.";
}

export class HomePageComponent implements ng.IComponentOptions {
    controllerAs: string = "homeViewModel";
    controller = HomePageController;
    template: string = `
        <div class="box">
        	<div class="box-header">
        		<h2>{{homeViewModel.pageTitle}}</h2>
        	</div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-12">
                        <h4>What you can do here?</h4>
                        <p>.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

