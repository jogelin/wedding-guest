/**
 * Created by Joni on 27/01/2017.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import * as guest from "./guest.actions";
import * as filter from "../filter/filter.actions";
import {FilterActionTypes} from "../filter/filter.actions";
import {GuestListItem} from "./guest.model";
import {Http} from "@angular/http";
import {GuestService} from "./guest.service";
import {GuestActionTypes} from "./guest.actions";


@Injectable()
export class GuestEffects {
    constructor(private _actions$: Actions, private _af: AngularFire, private _http: Http, private _gs: GuestService) {
    }

    @Effect()
    loadGuests$: Observable <Action> = this._actions$
        .ofType(GuestActionTypes.LOAD)
        .startWith(new guest.LoadAction())
        .switchMap(() =>
            this._af.database.list('/guest-list')
             .map((guests: GuestListItem[]) => new guest.LoadSuccessAction(guests))
             .catch(error => Observable.of(new guest.LoadFailAction(error)))
        );

    /*@Effect()
    loadGuests$: Observable <Action> = this._actions$
        .ofType(GuestActionTypes.LOAD)
        .switchMap(() =>
            this._http.get('./assets/guests.json')
                .map(response => response.json()['guest-list'] as GuestListItem[])
                .map((guests: GuestListItem[]) => new guest.LoadSuccessAction(guests))
                .catch(error => Observable.of(new guest.LoadFailAction(error)))
        );*/

    @Effect()
    filterGuests$: Observable <Action> = this._actions$
        .ofType(FilterActionTypes.FILTER)
        .map((action: filter.FilterAction) => action.payload)
        .switchMap((query: string) => this._gs.filterGuestList(query)
            .map((filteredNames: string[]) => new filter.FilterCompleteAction(filteredNames))
            .catch(error => Observable.of(new filter.FilterFailAction(error)))
        );
}
