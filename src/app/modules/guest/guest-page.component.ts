import {Component} from "@angular/core";
import * as fromRoot from "../../app.reducers";
import * as guest from "./guest.actions";
import "rxjs/add/operator/map";
import {Store} from "@ngrx/store";
import {GuestListItem} from "./guest.model";
import {Observable} from "rxjs";


@Component({
    selector: 'wg-guest-page',
    styles: [`
    `],
    template: `
        <div class="row">    
            <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                <wg-sidebar></wg-sidebar>
            </nav>  
            <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
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

    constructor(private _store: Store<fromRoot.State>) {
        this.filteredIds$ = _store.select(fromRoot.getFilterFilteredIds);

        this.guestList$ = _store.select(fromRoot.getFilteredGuestList);
        this.loading$ = _store.select(fromRoot.getGuestListLoading);

        this.tags$ = _store.select(fromRoot.getGuestListTags);

        this._store.dispatch(new guest.LoadAction());
    }

}
