import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../app.reducers';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Guest} from './guest.model';
import {GuestService} from './guest.service';
import {Observable} from 'rxjs';


@Component({
    selector: 'wg-guest-list',
    template: `
        <md-sidenav-container fullscreen>
          <md-sidenav #sidenav  mode="side" opened="true">
              <md-nav-list>
                <a md-list-item>
                  <md-icon md-list-icon>home</md-icon>
                  <span md-line>All Guests</span>
                </a>
        </md-nav-list>
          </md-sidenav>
        
          <md-list class="my-content">
            <md-spinner *ngIf="loading$ | async"></md-spinner>
            <md-list-item *ngFor="let guest of guests$ | async">
                {{guest.name}}
            </md-list-item>
          </md-list>
        
        </md-sidenav-container>
  `,
    styles: [`
        md-sidenav-container {
          margin-top:64px;
        } 
    `]
})
export class GuestListComponent implements OnInit {

    guests$: Observable<Guest[]>;
    loading$: Observable<boolean>;

    constructor(guestService: GuestService, private store: Store<fromRoot.State>) {
        this.guests$ = store.select(fromRoot.guestsSelector);
        this.loading$ = store.select(fromRoot.guestsLoadingSelector);

        guestService.retrieveGuests();
    }

    ngOnInit() {

    }

}
