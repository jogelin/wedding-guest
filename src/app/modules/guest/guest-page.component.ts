import {Component} from '@angular/core';
import * as fromRoot from '../../app.reducers';
import * as guest from './guest.actions';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {GuestListItem} from './guest.model';
import {Observable} from 'rxjs';
import * as filter from '../filter/filter.actions';

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
                            <wg-tag-switch [tag]="tag" [query]="query" (tagSwitch)="tagSwitch($event, tag)"></wg-tag-switch>
                        </a>
                    </li>
                </wg-sidebar>
            </nav>  
            <main class="col-sm-8 offset-sm-4 col-md-9 offset-md-3 pt-3">
                <wg-guest-list 
                    [guestList]="guestList$ | async" 
                    [query]="query"
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
    tags$: Observable<string[]>;

    query: string = '';


    constructor(private _store: Store<fromRoot.State>) {

        this.guestList$ = _store.select(fromRoot.getFilteredGuestList);
        this.loading$ = _store.select(fromRoot.getGuestListLoading);

        this.tags$ = _store.select(fromRoot.getGuestListTags);

        _store.select(fromRoot.getFilterQuery)
            .subscribe(query => this.query = query);

        this._store.dispatch(new guest.LoadAction());
    }

    tagSwitch(value: string, tag: string): void {
        this.query = this.query.replace(` and !${tag}`, '');
        this.query = this.query.replace(` and ${tag}`, '');
        this.query = this.query.replace(`!${tag}`, '');
        this.query = this.query.replace(`${tag}`, '');
        if (value != '') {
            if (this.query && this.query != '') {
                this.query = `${this.query} and ${value}`;
            }
            else {
                this.query = `${value}`;
            }
        }

        console.log("FILTER from sidebar");
        this._store.dispatch(new filter.FilterAction(this.query));
    }
}
