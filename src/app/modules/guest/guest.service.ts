/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducers";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs";
import {GuestListItem, Guest} from "./guest.model";


@Injectable()
export class GuestService {
    constructor(private _store: Store<fromRoot.State>) {
    }

    filterGuestList(query: string): Observable<String[]> {
        const criterias: string[] = query.split(/ and /);
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
