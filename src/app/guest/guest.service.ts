/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";
import {Store} from "@ngrx/store";
import * as fromRoot from "../app.reducers";
import * as guest from "./guest.actions";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";


@Injectable()
export class GuestService {
  constructor(private af: AngularFire, private store: Store<fromRoot.State>,) {
  }

  retrieveGuests(): void {
    this.store.dispatch(new guest.LoadAction());

    this.af.database.list('/guests')
        .do(guests => console.log(guests))
      .subscribe((guests) => this.store.dispatch(new guest.LoadSuccessAction(guests)));
  }

}
