import {Component} from "@angular/core";
import * as fromRoot from "../../app.reducers";
import * as guest from "./guest.actions";
import "rxjs/add/operator/map";
import {Store} from "@ngrx/store";
import {GuestListItem} from "./guest.model";
import {Observable} from "rxjs";
import * as filter from "../filter/filter.actions";

@Component({
    selector: 'wg-guest-page',
    styles: [`
    `],
    template: `
        <div class="row">    
            <nav class="col-sm-4 col-md-3 hidden-xs-down bg-faded sidebar">
                <wg-sidebar>
                    <li *ngFor="let tag of tags$ | async" class="nav-item">
                        <a class="nav-link">
                            <wg-tag-switch [tag]="tag" [query]="query$ | async" (tagSwitch)="onTagSwitch(value)"></wg-tag-switch>
                        </a>
                    </li>
                </wg-sidebar>
            </nav>  
            <main class="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
                <wg-guest-list 
                    [guestList]="guestList$ | async" 
                    [filteredNames]="filteredIds$ | async"
                    [loading]="loading$ | async"
                    [tags]="tags$ | async">       
                </wg-guest-list>      
            </main>
        </div>
    `
})
export class GuestPageComponent {

    guestList$: Observable<GuestListItem[]>;
    loading$: Observable<boolean>;
    filteredIds$: Observable<string[]>;
    tags$: Observable<string[]>;
    query$: Observable<string>;


    constructor(private _store: Store<fromRoot.State>) {
        this.filteredIds$ = _store.select(fromRoot.getFilterFilteredIds);

        this.guestList$ = _store.select(fromRoot.getFilteredGuestList);
        this.loading$ = _store.select(fromRoot.getGuestListLoading);

        this.tags$ = _store.select(fromRoot.getGuestListTags);

        this.query$ = _store.select(fromRoot.getFilterQuery);

        this._store.dispatch(new guest.LoadAction());
    }

    onTagSwitch(value: string): void {
        console.log('df', value);
        this._store.dispatch(new filter.FilterAction(null));
    }
}
