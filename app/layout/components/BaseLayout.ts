/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

class BaseLayoutController implements ng.IComponentController {}

export class BaseLayoutComponent implements ng.IComponentOptions {
    controllerAs: string = "baseLayoutViewModel";
    controller = BaseLayoutController;
    template: string = `
        <div class="container-fluid">
            <div ui-view="content"></div>
        </div>
    `;
}