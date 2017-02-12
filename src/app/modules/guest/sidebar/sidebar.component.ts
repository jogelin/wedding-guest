/**
 * Created by Joni on 26/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../app.reducers";


@Component({
    selector: 'wg-sidebar',
    styles: [`

    `],
    template: `
        <ul class="nav nav-pills flex-column">
            <li class="nav-item">
                <a class="nav-link" href="">Total filtered : {{filteredGuestLength$ | async}}</a>
            </li>
            <li class="nav-item">
                
                <a class="nav-link" href="">Total Group : {{filteredGuestGroupLength$ | async}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Analytics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Export</a>
            </li>
        </ul>
    `
})
export class SidebarComponent implements OnInit {

    filteredGuestLength$: Observable<number>;
    filteredGuestGroupLength$: Observable<number>;

    constructor(private _store: Store<fromRoot.State>) {
        this.filteredGuestLength$ = _store.select(fromRoot.getFilteredGuestLength);
        this.filteredGuestGroupLength$ = _store.select(fromRoot.getFilteredGuestGroupLength);
    }

    ngOnInit(): void {

    }
}
