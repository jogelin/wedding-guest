"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Joni on 28/12/2016.
 */
var core_1 = require("@angular/core");
var guest = require("./guest.actions");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
var GuestService = (function () {
    function GuestService(af, store) {
        this.af = af;
        this.store = store;
    }
    GuestService.prototype.retrieveGuests = function () {
        var _this = this;
        this.store.dispatch(new guest.LoadAction());
        this.af.database.list('/guests')
            .do(function (guests) { return console.log(guests); })
            .subscribe(function (guests) { return _this.store.dispatch(new guest.LoadSuccessAction(guests)); });
    };
    GuestService = __decorate([
        core_1.Injectable()
    ], GuestService);
    return GuestService;
}());
exports.GuestService = GuestService;
