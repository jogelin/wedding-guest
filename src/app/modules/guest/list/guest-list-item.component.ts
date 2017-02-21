import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem, Guest} from '../guest.model';
import {FormGroup, Validators, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../app.reducers";
import {UpdateAction} from "../guest.actions";


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
                        [matchFilter]="matchFilter(guestGroup.get('name').value)" 
                        [form]="guestGroup"
                        [tags]="tags"
                        (tagsValueChanged)="tagsValueChanged($event, i)" >                           
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

    constructor(private _fb: FormBuilder, private _store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            address: [this.item.address, Validators.required],
            guests: this.initGuests()
        });

       /* this.form.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((guestListItem:GuestListItem) => console.log('UPDATE',guestListItem)this._store.dispatch(
                new UpdateAction({$key:this.item.$key, data:guestListItem})
            ));*/
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

    initTags(tags: string[]): FormControl[] {
        return tags.map(tag => this._fb.control(tag));
    }

    tagsValueChanged(obj, i):void {
        console.log(obj.value, i);
        let guest:FormGroup = (this.form.get('guests') as FormArray).controls[i] as FormGroup;
        (guest.get('tags') as FormArray).reset();
        (guest.get('tags') as FormArray).setValue(this.initTags(obj.value));
    }

    matchFilter(guestName: string) {
        return this.filteredNames.includes(guestName);
    }
}
