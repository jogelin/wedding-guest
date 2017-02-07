import {Component, Input, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import {GuestListItem, Guest} from "../guest.model";
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item-edit',
    styles: [`

        :host >>> figure {
          justify-content:flex-start;
          padding-left: 10px;
        }
        .md-chip:not(.md-basic-chip) {
          padding:2px;
          border-radius: 3px;
          font-size: 12px;
        }
        
        .disable {
            background-color:grey;
        }
        
    `],
    template: `
        <div [formGroup]="form">
        
            <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                <md-input-container>
                    <input md-input formcontrolname="name" />
                </md-input-container>
            </md-grid-tile>
            <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                <md-input-container>
                    <input md-input formcontrolname="email" />
                </md-input-container>
                {{guest.email}}
            </md-grid-tile>
            <md-grid-tile [colspan]="3" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                <md-chip-list>
                    <div formArrayName="groups">
                        <md-chip *ngFor="let group of guest.groups">{{group}}</md-chip>
                    </div>
                </md-chip-list>
            </md-grid-tile>
        </div>

    `
})
export class GuestListItemGuestComponent implements OnInit{
    @Input() guest: Guest;
    @Input() filteredNames: string[] = [];

    @Input() form: FormGroup;

    constructor(private _fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.form.push(
            this._fb.group({
                name: [this.guest.name, Validators.required],
                email: [this.guest.name, Validators.required],
                groups: this._fb.array([])

        }));
    }

    matchFilter(guestName: string) {
        return !this.filteredNames.includes(guestName);
    }
}
