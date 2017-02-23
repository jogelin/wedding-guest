import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem, Guest} from '../guest.model';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducers';
import {UpdateAction} from '../guest.actions';


@Component({
    selector: 'wg-guest-list-item',
    styles: [`

        form > div > div:not(:last-child) {
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom:1px solid #ccc;
        }

        textarea.form-control {
            height: 100%;
        }

    `],
    template: `
        <form class="row d-flex align-items-stretch" *ngIf="item" [formGroup]="form">
            <div class="col-sm-9">            
                <div *ngFor="let guestGroup of form.controls.guests.controls;">
                    <wg-guest-list-item-guest 
                        [query]="query" 
                        [form]="guestGroup"
                        [tags]="tags">                           
                    </wg-guest-list-item-guest>
                </div>
            </div>
            <div class="col-sm-3 pl-1">
                <textarea [class.bg-warning]="form.controls.address.value == ''" formControlName="address" class="form-control">{{form.controls.address.value}}</textarea>
            </div>
        </form>
    `
})
export class GuestListItemComponent implements OnInit {
    @Input() item: GuestListItem;
    @Input() query: string;
    @Input() tags: string[];

    form: FormGroup;

    constructor(private _fb: FormBuilder, private _store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            address: [this.item.address, Validators.required],
            guests: this.initGuests()
        });

        this.form.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((guestListItem: GuestListItem) => {
                guestListItem.$key = this.item.$key;
                this._store.dispatch(
                    new UpdateAction(guestListItem)
                )
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
            tags: [guest.tags]
        });
    }
}
