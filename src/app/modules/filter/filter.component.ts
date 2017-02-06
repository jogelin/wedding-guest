/**
 * Created by Joni on 26/01/2017.
 */
import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'wg-filter',
    styles: [`
        md-card {
            border-radius: 0;
        }
        md-input-container {
            width:100%;
        }
        md-spinner {
            width: 30px;
            height: 30px;
            position: relative;
            top: 10px;
            left: 10px;
            opacity: 0.0;
        }
        .ng-invalid {
            color: red;
        }
    `],
    template: `
        <md-card>
            <md-input-container>
                <form [formGroup]="form" novalidate>
                    <input formControlName="query" md-input [value]="query" pattern="^([!A-Z]+)( and [!A-Z]+)*" placeholder="Filter the list">
                </form>
            </md-input-container>
            Total filtered : {{filteredGuestLength}}<br>
            Total Group : {{filteredGuestGroupLength}}
        </md-card>
    `
})
export class FilterComponent implements OnInit, OnChanges {
    @Input() query: string = '';
    @Input() filtering = false;
    @Output() filter = new EventEmitter<string>();

    @Input() filteredGuestLength: number = 0;
    @Input() filteredGuestGroupLength: number = 0;

    form: FormGroup;

    constructor(private _fb: FormBuilder) {
        this.form = this._fb.group({
            query: ['', Validators.pattern(/^([!A-Z]+)( and [!A-Z]+)*$/)]
        });
    }

    ngOnInit(): void {
        this.form.get('query').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(value => this.filter.emit(value));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.form.setValue({
            query: this.query
        });
    }
}
