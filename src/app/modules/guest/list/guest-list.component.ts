import {Component, Input, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import {Guest, GuestListItem} from "../guest.model";


@Component({
    selector: 'wg-guest-list',
    styles: [`
        .list-group .list-group-item {
            margin-bottom: 5px;
        }
    `],
    template: `
        <i *ngIf="loading" class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
        <div class="list-group">
            <!--            <div class="list-group-item p-1">
                            <wg-guest-list-item class="w-100" 
                                [item]="newItem" 
                                [tags]="tags">
                            </wg-guest-list-item>
                        </div>-->
            <textarea rows="10">{{getEmails()}}</textarea>
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

    EMAIL_REGEX = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');

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

    getEmails(): string {
        return this.guestList.reduce((acc, val) => {
            return acc.concat(
                val.guests
                    .filter(g => this.EMAIL_REGEX.test(g.email))
                    .reduce((a,v) => a.concat(v.email), [])
            );
        }, []).join(';');
    }
}
