import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'wg-root',
    template: `
        <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse"
                    data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Wedding Guests</a> 
            <ul class="navbar-nav mr-auto">
            
            </ul>
            <wg-filter></wg-filter>
        </nav>
        <div class="container-fluid">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    constructor(public route: ActivatedRoute,
                public router: Router) {
    }

}
