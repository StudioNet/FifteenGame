
module Core {
    export interface IFunc {
        (evt: ng.IAngularEvent): any;
    }
}

export = Core;