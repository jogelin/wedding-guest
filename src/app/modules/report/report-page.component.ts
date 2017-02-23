import {Component} from '@angular/core';
import * as fromRoot from '../../app.reducers';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';


@Component({
    selector: 'wg-report-page',
    styles: [`
    `],
    template: `
        <div class="row">    

        </div>
    `
})
export class ReportPageComponent {

    constructor(private _store: Store<fromRoot.State>) {

    }

}
