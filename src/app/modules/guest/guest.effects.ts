/**
 * Created by Joni on 27/01/2017.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import * as guest from "./guest.actions";
import {GuestActionTypes} from "./guest.actions";
import * as filter from "../filter/filter.actions";
import {FilterActionTypes} from "../filter/filter.actions";
import {GuestListItem} from "./guest.model";
import {GuestService} from "./guest.service";
import "rxjs/add/operator/map";

@Injectable()
export class GuestEffects {
    constructor(private _actions$: Actions, private _gs: GuestService) {
    }

    @Effect()
    loadGuests$: Observable <Action> = this._actions$
        .ofType(GuestActionTypes.LOAD)
        .startWith(new guest.LoadAction())
        .switchMap(() =>
            this._gs.loadGuests()
                .map((guests: GuestListItem[]) => new guest.LoadSuccessAction(guests))
                .catch(error => Observable.of(new guest.LoadFailAction(error)))
        );

    @Effect()
    filterGuests$: Observable <Action> = this._actions$
        .ofType(FilterActionTypes.FILTER)
        .map((action: filter.FilterAction) => action.payload)
        .switchMap((query: string) => this._gs.filterGuestList(query)
            .map((filteredNames: string[]) => new filter.FilterCompleteAction(filteredNames))
            .catch(error => Observable.of(new filter.FilterFailAction(error)))
        );

    @Effect()
    updateGuestListItem$: Observable <Action> = this._actions$
        .ofType(GuestActionTypes.UPDATE)
        .map((action: guest.UpdateAction) => action.payload)
        .switchMap(({$key, data}) =>
            this._gs.updateGuestListItem($key, data)
                .map(() => new guest.UpdateSuccessAction(data))
                .catch(err => Observable.of(new guest.UpdateFailedAction(err)))
        );

}
