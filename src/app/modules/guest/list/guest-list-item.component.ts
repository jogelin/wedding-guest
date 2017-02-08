import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem, Guest} from '../guest.model';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item',
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
        <md-grid-list *ngIf="item" cols="6" rowHeight="25px" [formGroup]="form">
                <template formArrayName="guests">  
                    <template *ngFor="let guest of form.controls.guests.controls; let first=first; let i=index;">
                            <wg-guest-list-item-guest 
                                [matchFilter]="true" 
                                [form]="form.controls.guests.controls[i]">                           
                            </wg-guest-list-item-guest><div></div>
                        <md-grid-tile
                            *ngIf="first"
                            [colspan]="1"
                            [rowspan]="item.guests.length">
                            <textarea [value]="form.controls.address.value"></textarea>
                        </md-grid-tile>
                    </template>
                </template>
        </md-grid-list>
    `
})
export class GuestListItemComponent implements OnInit{
    @Input() item: GuestListItem;
    @Input() filteredNames: string[] = [];

    form: FormGroup;

    constructor(private _fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            address: [this.item.address, Validators.required],
            guests: this.initGuests()
        });
    }

    initGuests(): FormArray {
        return this._fb.array(this.item.guests.map(guest => this.initGuest(guest)));
    }

    initGuest(guest: Guest): FormGroup {
        return this._fb.group({
            name: [guest.name, Validators.required],
            email: [guest.email, Validators.required],
            groups: this._fb.array([])
        });
    }

    matchFilter(guestName: string) {
        return !this.filteredNames.includes(guestName);
    }
}
