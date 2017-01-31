import {Component, Input} from "@angular/core";
import "rxjs/add/operator/map";
import {GuestListItem} from "../guest.model";


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
        }
        
    `],
    template: `
        <md-grid-list *ngIf="item" cols="6" rowHeight="25px">
            <div *ngFor="let guest of item.guests; let first=first">
                <md-grid-tile [colspan]="1" [rowspan]="1">
                    {{guest.name}}
                </md-grid-tile>
                <md-grid-tile [colspan]="1" [rowspan]="1">
                    {{guest.email}}
                </md-grid-tile>
                <md-grid-tile [colspan]="3" [rowspan]="1">
                    <md-chip-list>
                        <md-chip *ngFor="let group of guest.groups">{{group}}</md-chip>
                    </md-chip-list>
                </md-grid-tile>
                <md-grid-tile
                    *ngIf="first"
                    [colspan]="1"
                    [rowspan]="item.guests.length"
                    [style.background]="'#CCFFCC'">
                    <div [innerHTML]="item.address"></div>
                </md-grid-tile>
            </div>
        </md-grid-list>
    `
})
export class GuestListItemComponent {
    @Input() item: GuestListItem;
}
