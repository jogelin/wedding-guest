import {Component} from "@angular/core";
import * as fromRoot from "../../app.reducers";
import * as guest from "./guest.actions";
import * as filter from "../filter/filter.actions";
import "rxjs/add/operator/map";
import {Store} from "@ngrx/store";
import {GuestListItem} from "./guest.model";
import {Observable} from "rxjs";


@Component({
    selector: 'wg-guest-page',
    styles: [`
        md-sidenav-container {
          margin-top:64px;
        } 
        md-sidenav .md-sidenav-opened {
          box-shadow: none;
        }
    `],
    template: `
        <md-sidenav-container fullscreen>
            <md-sidenav #sidenav mode="side" opened="true">
                <md-nav-list>
                    <a md-list-item>
                        <md-icon md-list-icon>home</md-icon>
                        <span md-line>All Guests</span>
                    </a>
                </md-nav-list>
            </md-sidenav>
            <wg-filter [filtering]="filtering$ | async" [query]="query$ | async" (filter)="filterGuest($event)"></wg-filter>
            <wg-guest-list [guestList]="guestList$ | async" [loading]="loading$ | async"></wg-guest-list>
        </md-sidenav-container>
`
})
export class GuestPageComponent {

    guestList$: Observable<GuestListItem[]>;
    loading$: Observable<boolean>;
    query$: Observable<string>;
    filtering$: Observable<boolean>;

    constructor(private _store: Store<fromRoot.State>) {
        this.query$ = _store.select(fromRoot.getFilterQuery);
        this.filtering$ = _store.select(fromRoot.getFilterLoading);

        this.guestList$ = _store.select(fromRoot.getFilterFilteredList);
        this.loading$ = _store.select(fromRoot.getGuestListLoading);

        this._store.dispatch(new guest.LoadAction());
    }

    filterGuest(query: string) {
        this._store.dispatch(new filter.FilterAction(query));
    }
}
