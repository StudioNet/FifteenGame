/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

class MemberPageController implements ng.IComponentController {
    public pageTitle: string = "Your private page";
}

export class MemberPageComponent implements ng.IComponentOptions {
    controllerAs: string = "memberViewModule";
    controller = MemberPageController;
    template: string = `
        <div class="box">
        	<div class="box-header">
        		<h2>{{memberViewModule.pageTitle}}</h2>
        	</div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-12">
                       &nbsp;
                    </div>
                </div>
            </div>
        </div>
    `;    
}