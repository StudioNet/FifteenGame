/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

const member = require('../../assets/imgs/member64.png');

class TopBarController implements ng.IComponentController {
    title: string = "Fifteen Puzzle Portal";
	memberIcon: string = member;
    constructor() {
		console.log(member);
	}
}

export class TopBarComponent implements ng.IComponentOptions {
    controllerAs: string = "topbarViewModel";
    controller = TopBarController;
    template: string = `
        <nav class="navbar navbar-dark navbar-fixed-top bg-inverse">
        	<a class="navbar-brand text-uppercase" href ui-sref="fifteen.home">{{topbarViewModel.title}}</a>
        	<div id="navbar">
        		<nav class="nav navbar-nav float-xs-right">
        			<div class="btn-group">
        				<a class="text-uppercase" data-toggle="dropdown">
        					Fifteen Player
        					<img class="avatar menu-img" ng-src="{{topbarViewModel.memberIcon}}" />
        				</a>
        				<div class="dropdown-menu">
        					<a class="dropdown-item" ui-sref="fifteen.login" href>Logout</a>
        				</div>
        			</div>
        		</nav>
        	</div>
        </nav>
    `;    
};

