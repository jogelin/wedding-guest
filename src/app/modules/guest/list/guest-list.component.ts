import {Component, Input} from "@angular/core";
import "rxjs/add/operator/map";
import {GuestListItem} from "../guest.model";


@Component({
    selector: 'wg-guest-list',
    styles: [`
        .list-tag .list-tag-item {
            margin-bottom: 2px;
        }
    `],
    template: `
        <i *ngIf="loading" class="fa fa-spinner" aria-hidden="true"></i>
        <div class="list-tag">
            <div *ngFor="let item of guestList" class="list-tag-item p-1">
                <wg-guest-list-item class="w-100" 
                    [item]="item" 
                    [filteredNames]="filteredNames" 
                    [tags]="tags">
                </wg-guest-list-item>
            </div>
        </div>
    `
})
export class GuestListComponent {
    @Input() guestList: GuestListItem[] = [];
    @Input() filteredNames: string[] = [];
    @Input() loading: boolean = false;
    @Input() tags: string[];

}
