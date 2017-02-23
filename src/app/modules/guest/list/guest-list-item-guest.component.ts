import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import 'rxjs/add/operator/map';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'wg-guest-list-item-guest',
    styles: [`
        :host .match >>> tag {
            border: 1px solid green;
        }
    `],
    template: `
        <div class="row" [formGroup]="form">
            <div class="col-sm-4 pr-1">
                <div class="row">
                    <div class="col-sm-12 mb-1">
                        <input class="form-control form-control-sm" type="text" formControlName="name" />
                    </div>
                    <div class="col-sm-12 mt-1">
                        <input [class.bg-warning]="form.controls.email.value == ''" class="form-control form-control-sm" type="email" formControlName="email" />
                    </div>
                </div>
            </div>
            <div class="col-sm-8 pl-0 pr-1">
                <div [class.match]="matchQuery">
                    <wg-tag-input [tags]="tags" [control]="form.get('tags')">
                    </wg-tag-input>
                </div>
            </div>
        </div>
    `
})
export class GuestListItemGuestComponent implements OnChanges {
    @Input() query: string;
    @Input() form: FormGroup;
    @Input() tags: string[];

    matchQuery: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['query'] && JSON.stringify(changes['query'].previousValue) !== JSON.stringify(changes['query'].currentValue)) {
            this.matchQuery = this.inQuery();
        }
    }

    inQuery(): boolean {
        return this.form.get('tags').value
                .filter(val => this.query.includes(val)).length > 0
    }
}
