module Core {
    export interface IAction {
        (evt: ng.IAngularEvent): void;
        (evt: ng.IAngularEvent, args: any): void;
        (evt: JQueryEventObject, ui: any): void;
    }
}

export = Core;