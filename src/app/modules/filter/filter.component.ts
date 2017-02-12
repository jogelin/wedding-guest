/**
 * Created by Joni on 26/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import * as filter from "../filter/filter.actions";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducers";


@Component({
    selector: 'wg-filter',
    styles: [`

    `],
    template: `
        <form class="mt-2 mt-md-0" [formGroup]="form" novalidate>
            <input type="text" class="form-control mr-sm-2" formControlName="query" placeholder="Filter the list">
        </form>
    `
})
export class FilterComponent implements OnInit {

    query$: Observable<string>;
    filtering$: Observable<boolean>;

    form: FormGroup;

    constructor(private _fb: FormBuilder, private _store: Store<fromRoot.State>) {
        this.query$ = _store.select(fromRoot.getFilterQuery);
        this.filtering$ = _store.select(fromRoot.getFilterLoading);

        this.form = this._fb.group({
            query: ['', Validators.pattern(/^([!A-Z]+)( and [!A-Z]+)*$/)]
        });
    }

    ngOnInit(): void {
        this.query$.subscribe(query => {
            this.form.setValue({
                query: query
            });
        });

        this.form.get('query').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(value => this.filterGuest(value));
    }

    filterGuest(query: string) {
        if (this.form.valid) {
            this._store.dispatch(new filter.FilterAction(query));
        }
    }
}
