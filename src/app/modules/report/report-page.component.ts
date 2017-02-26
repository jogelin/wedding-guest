import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../app.reducers';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import * as report from './report.actions';
import {Report} from "./report.model";

@Component({
    selector: 'wg-report-page',
    styles: [`
    `],
    template: `
        <div class="row">    
            <pre>{{ report$ | async}}</pre>
        </div>
    `
})
export class ReportPageComponent implements OnInit{

    report$: Observable<Report>;

    constructor(private _store: Store<fromRoot.State>) {
        this.report$ = this._store.select(fromRoot.getReport);

        this._store.dispatch(new report.LoadAction());

    }

    ngOnInit(): void {

    }
}
