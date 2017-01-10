/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";
import {Store} from "@ngrx/store";
import * as fromRoot from "../app.reducers";
import * as guest from "./guest.actions";

import 'rxjs/add/operator/startWith';


@Injectable()
export class GuestService {
  constructor(private af: AngularFire, private store: Store<fromRoot.State>, ) {
  }

  retrieveGuests(): void {
    this.af.database.list('/guests')
      .startWith(new guest.LoadAction())
      .map(guestList => new guest.LoadSuccessAction(guestList))
      .subscribe((action: guest.LoadSuccessAction) => this.store.dispatch(action));
  }

}
