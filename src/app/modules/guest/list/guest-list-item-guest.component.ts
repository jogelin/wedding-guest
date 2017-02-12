import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import "rxjs/add/operator/map";
import {FormGroup, FormArray} from "@angular/forms";
import {Select2OptionData} from "ng2-select2";


@Component({
    selector: 'wg-guest-list-item-guest',
    styles: [`

        
    `],
    template: `
        <div class="row" [formGroup]="form">
            <div class="col-sm-3 pr-0" [class.disable]="matchFilter">
                <input class="form-control form-control-sm" type="text" formControlName="name" />
            </div>
            <div class="col-sm-3 pl-1 pr-1" [class.disable]="matchFilter">
                <input class="form-control form-control-sm" type="email" formControlName="email" />
            </div>
            <div class="col-sm-6 pl-1 pr-1" [class.disable]="matchFilter">
                <div formArrayName="tags">
                    <select2 [data]="tagOptions" [value]="tagValues" [options]="select2Options" (valueChanged)="valueChanged($event)"></select2>
                </div>
            </div>
        </div>
    `
})
export class GuestListItemGuestComponent implements OnInit, OnChanges {
    @Input() matchFilter: boolean;
    @Input() form: FormGroup;
    @Input() tags: string[];

    tagOptions: Select2OptionData[];
    tagValues: string[];

    select2Options: Select2Options = {
        tags: true,
        multiple: true
    };

    ngOnInit(): void {
        this.tagValues = (this.form.get('tags') as FormArray).controls.reduce((acc, one) => acc.concat(one.value),[]);
        (this.form.get('tags') as FormArray).valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(value => console.log('valuechanges: ',value));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['tags'] && JSON.stringify(changes['tags'].previousValue) !== JSON.stringify(changes['tags'].currentValue)) {
            this.tagOptions = this.tags
                .map(tag => {
                    return {
                        id: tag,
                        text: tag
                    } as Select2OptionData;
                });

        }
    }

    valueChanged(tags): void {
        (this.form.get('tags') as FormArray).patchValue(tags);
    }
}
