import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import "rxjs/add/operator/map";
import {FormGroup, FormArray, FormControl} from "@angular/forms";


@Component({
    selector: 'wg-guest-list-item-guest',
    styles: [`

        
    `],
    template: `
        <div class="row" [formGroup]="form">
            <div class="col-sm-4 pr-1">
                <div class="row" [class.active]="matchFilter">
                    <div class="col-sm-12 mb-1">
                        <input class="form-control form-control-sm" type="text" formControlName="name" />
                    </div>
                    <div class="col-sm-12">
                        <input class="form-control form-control-sm" type="email" formControlName="email" />
                    </div>
                </div>
            </div>
            <div class="col-sm-8 pl-1 pr-1">
                <div>
                    <wg-tag-input [tags]="tags" [control]="form.get('tags')">
                    </wg-tag-input>
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

    ngOnInit(): void {

       // console.log('BOUUUUUUUUUUU',(this.form.get('tags') as FormControl).value);
        /*(this.form.get('tags') as FormControl).valueChanges
            .map(({value}) => value);*/
        //this.tagValues = (this.form.get('tags') as FormArray).controls.reduce((acc, one) => acc.concat(one.value), []);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tags'] && JSON.stringify(changes['tags'].previousValue) !== JSON.stringify(changes['tags'].currentValue)) {
           // this.tagDropdown = this.tags;

        }
    }

    //
    // valueChanged(tags): void {
    //     (this.form.get('tags') as FormArray).setValue(tags.value);
    // }

}
