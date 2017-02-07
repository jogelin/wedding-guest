import {Component, Input} from "@angular/core";
import "rxjs/add/operator/map";
import {GuestListItem} from "../guest.model";


@Component({
    selector: 'wg-guest-list',
    styles: [`
        md-card {
          padding:0;
          margin:7px;
        }   
    `],
    template: `
        <md-spinner *ngIf="loading"></md-spinner>
        <md-card *ngFor="let item of guestList">
            <wg-guest-list-item-edit [item]="item" [filteredNames]="filteredNames"></wg-guest-list-item-edit>
        </md-card>
    `
})
export class GuestListComponent {
    @Input() guestList: GuestListItem[] = [];
    @Input() filteredNames: string[] = [];
    @Input() loading: boolean = false;
}
