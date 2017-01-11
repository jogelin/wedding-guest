"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var guest_list_component_1 = require('./guest-list.component');
describe('GuestListComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [guest_list_component_1.GuestListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(guest_list_component_1.GuestListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
