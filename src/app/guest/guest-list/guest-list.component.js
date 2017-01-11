"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var fromRoot = require("../../app.reducers");
require("rxjs/add/operator/map");
var GuestListComponent = (function () {
    function GuestListComponent(guestService, store) {
        this.store = store;
        this.guests$ = store.select(fromRoot.guestsSelector);
        this.loading$ = store.select(fromRoot.guestsLoadingSelector);
        guestService.retrieveGuests();
    }
    GuestListComponent.prototype.ngOnInit = function () {
    };
    GuestListComponent = __decorate([
        core_1.Component({
            selector: 'wg-guest-list',
            template: "\n<md-sidenav-container fullscreen>\n  <md-sidenav #sidenav  mode=\"side\" opened=\"true\">\n      <md-nav-list>\n        <a md-list-item>\n          <md-icon md-list-icon>home</md-icon>\n          <span md-line>All Guests</span>\n        </a>\n</md-nav-list>\n  </md-sidenav>\n\n  <md-list class=\"my-content\">\n    <md-spinner *ngIf=\"loading$ | async\"></md-spinner>\n    <md-list-item *ngFor=\"let guest of guests$ | async\">\n        {{guest.name}}\n    </md-list-item>\n  </md-list>\n\n</md-sidenav-container>\n\n  ",
            styles: ["\n        md-sidenav-container {\n          margin-top:64px;\n        } \n    "]
        })
    ], GuestListComponent);
    return GuestListComponent;
}());
exports.GuestListComponent = GuestListComponent;
