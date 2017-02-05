import {Component, Input} from "@angular/core";
import "rxjs/add/operator/map";
import {GuestListItem, Guest} from "../guest.model";


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
        <md-grid-list *ngIf="item" cols="6" rowHeight="25px">
            <div *ngFor="let guest of item.guests; let first=first">
                <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                    {{guest.name}}
                </md-grid-tile>
                <md-grid-tile [colspan]="1" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                    {{guest.email}}
                </md-grid-tile>
                <md-grid-tile [colspan]="3" [rowspan]="1" [class.disable]="matchFilter(guest.name)">
                    <md-chip-list>
                        <md-chip *ngFor="let group of guest.groups">{{group}}</md-chip>
                    </md-chip-list>
                </md-grid-tile>
                <md-grid-tile
                    *ngIf="first"
                    [colspan]="1"
                    [rowspan]="item.guests.length">
                    <div [innerHTML]="item.address"></div>
                </md-grid-tile>
            </div>
        </md-grid-list>
    `
})
export class GuestListItemComponent {
    @Input() item: GuestListItem;
    @Input() filteredNames: string[] = [];

    matchFilter(guestName: string) {
        return !this.filteredNames.includes(guestName);
    }
}
