import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem, Guest} from '../guest.model';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item',
    styles: [`

        form > div > div:not(:last-child) {
            padding-bottom: 5px;
        }

        textarea.form-control {
            height: 100%;
        }

        .disable {
            background-color:grey;
        }
    `],
    template: `
        <form class="row d-flex align-items-stretch" *ngIf="item" [formGroup]="form">
            <div class="col-sm-10">            
                <div *ngFor="let guestGroup of form.controls.guests.controls; let i=index;">
                    <wg-guest-list-item-guest 
                        [matchFilter]="true" 
                        [form]="guestGroup"
                        [tags]="tags">                           
                    </wg-guest-list-item-guest>
                </div>
            </div>
            <div class="col-sm-2 pl-1">
                <textarea class="form-control">{{form.controls.address.value}}</textarea>
            </div>
        </form>
    `
})
export class GuestListItemComponent implements OnInit{
    @Input() item: GuestListItem;
    @Input() filteredNames: string[] = [];
    @Input() tags: string[];

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
        return this._fb.array(
            this.item.guests.map(guest => this.initGuest(guest))
        );
    }

    initGuest(guest: Guest): FormGroup {
        return this._fb.group({
            name: [guest.name, Validators.required],
            email: [guest.email, Validators.required],
            tags: this.initTags(guest.tags)
        });
    }

    initTags(tags: string[]): FormArray {
        return this._fb.array(
            tags.map(tag => this._fb.control([tag]))
        );
    }

    matchFilter(guestName: string) {
        return !this.filteredNames.includes(guestName);
    }
}
