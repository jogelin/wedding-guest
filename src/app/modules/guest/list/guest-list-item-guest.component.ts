import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import "rxjs/add/operator/map";
import {FormGroup, FormArray} from "@angular/forms";
import {Select2OptionData} from "ng2-select2";


@Component({
    selector: 'wg-guest-list-item-guest',
    styles: [`
        :host >>> .select2 {
            width:100% ! important;
            line-height: 1 !important;
            font-size: .875rem;
            min-height:26px !important;
            border-radius: .2rem;
        }
        
        :host >>> .select2-selection__rendered {
            padding:0 !important;
        }
        
        :host >>> .select2-selection__choice {
            padding:1px !important;
            padding-bottom:3px !important;
            margin:2px !important;
        }
        
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
                    <select2 [data]="tagOptions" [value]="tagValues" [options]="select2Options" (valueChanged)="tagsValueChanged.emit($event)"></select2>
                </div>
            </div>
        </div>
    `
})
export class GuestListItemGuestComponent implements OnInit, OnChanges {
    @Input() matchFilter: boolean;
    @Input() form: FormGroup;
    @Input() tags: string[];
    @Output() tagsValueChanged = new EventEmitter();

    tagOptions: Select2OptionData[];
    tagValues: string[];

    select2Options: Select2Options = {
        tags: true,
        multiple: true,
        width: '100%'
    };

    ngOnInit(): void {
        this.tagValues = (this.form.get('tags') as FormArray).controls.reduce((acc, one) => acc.concat(one.value), []);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tags'] && JSON.stringify(changes['tags'].previousValue) !== JSON.stringify(changes['tags'].currentValue)) {
            this.tagOptions = this.tags
                .map(tag => {
                    return {
                        id: tag,
                        text: tag
                    } as Select2OptionData;
                });

        }
    }

    //
    // valueChanged(tags): void {
    //     (this.form.get('tags') as FormArray).setValue(tags.value);
    // }

}
