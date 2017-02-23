/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducers';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {GuestListItem, Guest} from './guest.model';
import {FirebaseListObservable, AngularFire} from 'angularfire2';


@Injectable()
export class GuestService {

    private _guestListFirebase$: FirebaseListObservable<GuestListItem[]> = null;

    constructor(private _store: Store<fromRoot.State>, private _af: AngularFire) {
    }

    /**CRUD GUST**/
    loadGuests(): Observable<GuestListItem[]> {
        return Observable.from(this.guestListFirebase$).take(1);
    }

    updateGuestListItem(guestListItem:GuestListItem): Observable<void> {
        const newGLI:GuestListItem = Object.assign({},guestListItem);
        delete newGLI.$key;
        return Observable.from(this.guestListFirebase$.update(`${guestListItem.$key}`, newGLI));
    }

    get guestListFirebase$(): FirebaseListObservable<GuestListItem[]> {
        if (this._guestListFirebase$ == null) {
            this._guestListFirebase$ = this._af.database.list('/guest-list');
        }
        return this._guestListFirebase$;
    }

    /**FILTER**/
    filterGuestList(query: string): Observable<String[]> {

        const criterias: string[] = query!=''?query.split(/ and /):[];
        const includes: string[] = criterias.filter(criteria => criteria.charAt(0) != '!');
        const excludes: string[] = criterias.filter(criteria => criteria.charAt(0) == '!').map(criteria => criteria.substring(1));

        return this._store.select(fromRoot.getGuestList)
            .map(guestList => guestList
                .map(guestListItem => this.filterGuestListItem(guestListItem, includes, excludes))
                .reduce((acc, one) => acc.concat(one), [])
            );
    }

    filterGuestListItem(guestListItem: GuestListItem, includes, excludes): string[] {
        return guestListItem.guests
            .filter(guest => this.filterGuest(guest, includes, excludes))
            .map(guest => guest.name);
    }

    filterGuest(guest: Guest, includes: string[], excludes: string[]): boolean {
        return includes.every((val) => guest.tags.includes(val)) &&
            excludes.every((val) => !guest.tags.includes(val))
    }
}
