import {Component, OnInit} from "@angular/core";
import * as fromRoot from "../app.reducers";
import "rxjs/add/operator/map";
import {Store} from "@ngrx/store";
import {Guests, Guest} from "./guest.model";
import {GuestService} from "./guest.service";
import {Observable} from "rxjs";


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
        
          <md-spinner *ngIf="loading$ | async"></md-spinner>
          <md-card *ngFor="let item of guestList$ | async">  
              <md-grid-list cols="3" rowHeight="30px">
                <div *ngFor="let guest of item.guests; let first=first">      
                  <md-grid-tile [colspan]="1" [rowspan]="1">
                    {{guest.name}}
                  </md-grid-tile>      
                  <md-grid-tile [colspan]="1" [rowspan]="1">
                    {{guest.email}}
                  </md-grid-tile>
                  <md-grid-tile
                      *ngIf="first"
                      [colspan]="1"
                      [rowspan]="item.guests.length"
                      [style.background]="'#CCFFCC'">
                    <div [innerHTML]="item.address"></div>
                  </md-grid-tile>
                </div>
              </md-grid-list>
          </md-card>
        
        </md-sidenav-container>
  `,
  styles: [`
        md-sidenav-container {
          margin-top:64px;
        } 
        md-sidenav .md-sidenav-opened {
          box-shadow: none;
        }
        md-card {
          padding:0;
          margin:7px;
        }
        :host >>> figure {
          justify-content:flex-start;
          padding-left: 10px;
        }
    `]
})
export class GuestListComponent implements OnInit {

  guestList$: Observable<Guests[]>;
  loading$: Observable<boolean>;

  constructor(guestService: GuestService, private store: Store<fromRoot.State>) {
    this.guestList$ = store.select(fromRoot.guestListSelector);
    this.loading$ = store.select(fromRoot.guestsLoadingSelector);

    guestService.retrieveGuests();
  }

  ngOnInit() {

  }

}
