import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
  <md-toolbar color="primary">
    <h2>Wedding Guests</h2>
    <button md-button [routerLink]="'guests'" >
      Guest List
    </button>
    <md-icon class="example-icon">favorite</md-icon>
    <md-icon class="example-icon">delete</md-icon>
  </md-toolbar>
  <router-outlet></router-outlet>

`
})
export class AppComponent {
  constructor(public route: ActivatedRoute,
              public router: Router) {
  }

}
