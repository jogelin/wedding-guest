/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from "@angular/core";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {
    Report, ReportCount, ReportCol, ReportRow, ReportBuilder, ReportRowBuilder,
    ReportColBuilder, ReportCountBuilder
} from "./report.model";


@Injectable()
export class ReportService {

    constructor() {
    }

    loadReport(): Observable<Report> {
        return Observable.of(this.report);
    }


    get counts(): ReportCount[] {
        return [
            new ReportCountBuilder().name('adults').query('!ENFANT').icon('').build(),
            new ReportCountBuilder().name('children').query('ENFANT').icon('').build(),
            new ReportCountBuilder().name('confirmed').query('CONFIRMED').icon('').build(),
            new ReportCountBuilder().name('cancelled').query('CANCELLED').icon('').build(),
            new ReportCountBuilder().name('unknown').query('!CANCELLED and !CONFIRMED').icon('').build()
        ];
    }

    get cols(): ReportCol[] {
        return [
            new ReportColBuilder().name('Civil').query('CIVIL').counts(this.counts).build(),
            new ReportColBuilder().name('Celebration').query('CELEBRATION').counts(this.counts).build(),
            new ReportColBuilder().name('Soirée').query('SOIREE').counts(this.counts).build()
        ];
    }

    get rows(): ReportRow[] {
        return [
            new ReportRowBuilder().name('Aline').query('FROM_AL').cols(this.cols).build(),
            new ReportRowBuilder().name('Jonathan').query('FROM_JO').cols(this.cols).build(),
            new ReportRowBuilder().name('Total').query('').cols(this.cols).build()
        ];
    }

    get report(): Report {
        return new ReportBuilder()
            .headers([])
            //.rows(this.rows)
            .build();
    }
}
