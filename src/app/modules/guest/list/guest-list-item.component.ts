import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem} from '../guest.model';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item-edit',
    styles: [`
        md-card {
          padding:0;
          margin:7px;
        }

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
        <md-grid-list *ngIf="item" cols="6" rowHeight="25px">
            <div formArrayName="guests">           
                <div *ngFor="let guest of item.guests; let first=first; let i=index;">
                    <div>
                        <wg-guest-list-item-guest [guest]="guest" [form]="form.controls.guests.controls" [filteredNames]="filteredNames"></wg-guest-list-item-guest>
                    </div>
                    <md-grid-tile
                        *ngIf="first"
                        [colspan]="1"
                        [rowspan]="item.guests.length">
                        <div [innerHTML]="item.address"></div>
                    </md-grid-tile>
                </div>
            </div>
        </md-grid-list>
    `
})
export class GuestListItemEditComponent implements OnInit{
    @Input() item: GuestListItem;
    @Input() filteredNames: string[] = [];

    form: FormGroup;

    constructor(private _fb: FormBuilder) {
    }

    initGuests() {
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            address: ['', Validators.required],
            guests: this._fb.array([])
        });
    }

    matchFilter(guestName: string) {
        return !this.filteredNames.includes(guestName);
    }
}
