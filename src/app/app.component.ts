import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'wg-root',
    template: `
        <md-toolbar color="#0288d1">
            <h2>Wedding Guests</h2>
            <button md-button [routerLink]="'guests'">
                Guest List
            </button>
        </md-toolbar>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor(public route: ActivatedRoute,
                public router: Router) {
    }

}
