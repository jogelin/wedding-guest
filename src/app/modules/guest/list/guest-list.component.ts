import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {GuestListItem, Guest} from '../guest.model';


@Component({
    selector: 'wg-guest-list',
    styles: [`
        .list-group .list-group-item {
            margin-bottom: 5px;
        }
    `],
    template: `
        <i *ngIf="loading" class="fa fa-spinner" aria-hidden="true"></i>
        <div class="list-group">
            <div class="list-group-item p-1">
                <wg-guest-list-item class="w-100" 
                    [item]="newItem" 
                    [tags]="tags">
                </wg-guest-list-item>
            </div>
            <div *ngFor="let item of guestList" class="list-group-item p-1">
                <wg-guest-list-item class="w-100" 
                    [item]="item" 
                    [query]="query" 
                    [tags]="tags">
                </wg-guest-list-item>
            </div>            
        </div>
    `
})
export class GuestListComponent implements OnInit {
    @Input() guestList: GuestListItem[] = [];
    @Input() query: string;
    @Input() loading: boolean = false;
    @Input() tags: string[];

    newItem: GuestListItem;

    ngOnInit(): void {
        this.newItem = this.buildNewGuestListItem();
    }

    buildNewGuestListItem(): GuestListItem {
        return {
            guests: [this.buildNewGuest()],
            address: ""
        } as GuestListItem;
    }

    buildNewGuest(): Guest {
        return {
            name: "",
            email: "",
            tags: []
        } as Guest;
    }
}
