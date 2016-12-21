/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

const homeSvg = require('../../assets/imgs/home.svg');
const ruleSvg = require('../../assets/imgs/rules.svg');
const gameSvg = require('../../assets/imgs/game.svg');
const profileSvg = require('../../assets/imgs/profile_new.svg');


/**
 * SideBarController 
 */
class SideBarController implements ng.IComponentController {
	homeIcon: string = homeSvg;
	ruleIcon: string = ruleSvg;
	gameIcon: string = gameSvg;
	profIcon: string = profileSvg;

    constructor() {}
}

export class SideBarComponent implements ng.IComponentOptions {
    controllerAs: string = "sidebarViewModel";
    controller = SideBarController;
    template: string = `
        <div class="sidebar">
        	<ul class="nav nav-sidebar">
        		<li class="sidebar-link" ui-sref="fifteen.home" ui-sref-active="active">
					<i class="bar-icon"><img src={{sidebarViewModel.homeIcon}} /></i>
        			<a class="sidebar-item text-uppercase">Home</a>
        		</li>
				<li class="sidebar-link" ui-sref="fifteen.member" ui-sref-active="active">
        			<i class="bar-icon"><img src={{sidebarViewModel.profIcon}} /></i>
        			<a class="sidebar-item text-uppercase">Profile</a>
        		</li>
        		<li class="sidebar-link" ui-sref="fifteen.rules" ui-sref-active="active">
        			<i class="bar-icon"><img src={{sidebarViewModel.ruleIcon}} /></i>
        			<a class="sidebar-item text-uppercase">Rules</a>
        		</li>
				<li class="sidebar-link" ui-sref="fifteen.game" ui-sref-active="active">
        			<i class="bar-icon"><img src={{sidebarViewModel.gameIcon}} /></i>
        			<a class="sidebar-item text-uppercase">Game</a>
        		</li>
        	</ul>
        </div>
    `;
}
