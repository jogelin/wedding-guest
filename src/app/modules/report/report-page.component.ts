import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../app.reducers';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import * as report from './report.actions';
import {Report, ReportRow} from "./report.model";

@Component({
    selector: 'wg-report-page',
    styles: [`
        ul { 
            list-style-type: none;
            padding-left: 0.2rem;
            margin-bottom: 0;
        }
        th {
            text-align: center;
            vertical-align: middle;
        }
    `],
    template: `
        <div class="container mt-3">
            <div class="row">    
                <table class="table table-bordered table-inverse">
                <thead>
                    <tr>
                        <th>#</th>
                        <th *ngFor="let header of headers$ | async">{{header}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let row of rows$ | async">
                        <th scope="row" title="{{row.query}}">{{row.name}}</th>
                        <td *ngFor="let col of row.cols">
                            <ul>
                                <div class="d-flex justify-content-around">
                                    <div class="p-1">
                                        <i class="fa" aria-hidden="true" [ngClass]="col.counts[0].icon"></i>
                                        &nbsp;<span>{{col.counts[0].count}}</span>
                                    </div>
                                    <div class="p-1">
                                        <i class="fa" aria-hidden="true" [ngClass]="col.counts[1].icon"></i>
                                        &nbsp;<span>{{col.counts[1].count}}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around">
                                    <div class="p-1 text-success">
                                        <i class="fa" aria-hidden="true" [ngClass]="col.counts[2].icon"></i>
                                        &nbsp;<span>{{col.counts[2].count}}</span>
                                    </div>
                                    <div class="p-1 text-danger">
                                        <i class="fa" aria-hidden="true" [ngClass]="col.counts[3].icon"></i>
                                        &nbsp;<span>{{col.counts[3].count}}</span>
                                    </div>
                                    <div class="p-1" [class.text-warning]="(col.counts[4].count) > 0">
                                        <i class="fa" aria-hidden="true" [ngClass]="col.counts[4].icon"></i>
                                        &nbsp;<span>{{col.counts[4].count}}</span>
                                    </div>
                                </div>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    `
})
export class ReportPageComponent implements OnInit {

    headers$: Observable<string[]>;
    rows$: Observable<ReportRow[]>;

    constructor(private _store: Store<fromRoot.State>) {
        this.headers$ = this._store.select(fromRoot.getReportHeaders);
        this.rows$ = this._store.select(fromRoot.getReportRows);

        this._store.dispatch(new report.LoadAction());

    }

    ngOnInit(): void {

    }
}
