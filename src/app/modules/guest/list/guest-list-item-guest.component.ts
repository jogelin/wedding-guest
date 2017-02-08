import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Guest} from '../guest.model';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item-guest',
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
        <div [formGroup]="form">re
            <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter">
                <md-input-container>
                    <input type="text" md-input formControlName="name" />
                </md-input-container>
            </md-grid-tile>
            <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter">
                <md-input-container>
                    <input type="email" md-input formControlName="email" />
                </md-input-container>
            </md-grid-tile>
            <md-grid-tile [colspan]="3" [rowspan]="1" [class.disable]="matchFilter">
                <md-chip-list>
                    <div formArrayName="groups">
                        <md-chip *ngFor="let group of form.controls.groups.controls">{{group}}</md-chip>
                    </div>
                </md-chip-list>
            </md-grid-tile>
        </div>
    `
})
export class GuestListItemGuestComponent {
    @Input() matchFilter: boolean;
    @Input() form: FormGroup;

    constructor() {
    }
}
