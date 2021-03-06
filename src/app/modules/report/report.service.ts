/**
 * Created by Joni on 28/12/2016.
 */
import {Injectable} from "@angular/core";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {
    Report,
    ReportCount,
    ReportCol,
    ReportRow,
    ReportBuilder,
    ReportRowBuilder,
    ReportColBuilder,
    ReportCountBuilder,
    ReportCountRefresh
} from "./report.model";
import {GuestService} from "../guest/guest.service";


@Injectable()
export class ReportService {

    constructor(private guestService: GuestService) {
    }

    refreshReportCounts(report: Report): Observable<ReportCountRefresh[]> {

        let obs: Observable<ReportCountRefresh>[] = [];
        report.rows.forEach(row => {
            row.cols.forEach(col => {
                col.counts.forEach(count => {
                    const query = [row.query,col.query,count.query,].filter(qq => qq !== '').join(' and ');
                    obs = obs.concat(this.guestService.filterGuestList(query)
                        .take(1)
                        .map(filteredNames => ({
                            query: query,
                            path: [row.name, col.name, count.name],
                            count: filteredNames.length
                        })));
                });
            });
        });
        return Observable
            .merge(obs)
            .flatMap(ob => ob)
            .toArray();
    }

    loadReport(): Observable<Report> {
        return Observable.of(this.report);
    }

    get counts(): ReportCount[] {
        return [
            new ReportCountBuilder().name('adults').query('!ENFANT').icon('fa-users').build(),
            new ReportCountBuilder().name('children').query('ENFANT').icon('fa-child').build(),
            new ReportCountBuilder().name('confirmed').query('CONFIRMED').icon('fa-check-square-o').build(),
            new ReportCountBuilder().name('cancelled').query('CANCELLED').icon('fa-ban').build(),
            new ReportCountBuilder().name('unknown').query('!CANCELLED and !CONFIRMED').icon('fa-question-circle-o').build()
        ];
    }

    get cols(): ReportCol[] {
        return [
            new ReportColBuilder().name('Civil').query('CIVIL').counts(this.counts).build(),
            new ReportColBuilder().name('Celebration').query('CELEBRATION').counts(this.counts).build(),
            new ReportColBuilder().name('Soirée').query('SOIREE').counts(this.counts).build(),
            new ReportColBuilder().name('Total').query('').counts(this.counts).build()
        ];
    }

    get rows(): ReportRow[] {
        return [
            new ReportRowBuilder().name('Aline').query('FROM_AL').cols(this.cols).build(),
            new ReportRowBuilder().name('Jonathan').query('FROM_JO').cols(this.cols).build(),
            new ReportRowBuilder().name('Total').query('').cols(this.cols).build()
        ];
    }

    get headers(): string[] {
        return [
            'CIVIL',
            'CELEBRATION',
            'SOIREE',
            'TOTAL'
        ];
    }

    get report(): Report {
        return new ReportBuilder()
            .headers(this.headers)
            .rows(this.rows)
            .build();
    }
}
