import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import "rxjs/add/operator/map";
import {FormGroup, FormArray, FormControl} from "@angular/forms";


@Component({
    selector: 'wg-guest-list-item-guest',
    styles: [`
        :host >>> tag {
            font-size: 10px !important;
            padding: 2px !important;
            border: 1px solid grey;
            line-height: 10px !important;
            height: 15px !important;
        }   
        :host >>> tag-input-form {
            padding: 2px !important;
            line-height: 10px !important;
        }   
        :host >>> tag-input-form .ng2-tag-input__text-input {
            font-size: 10px !important;
            padding: 0 !important;
            line-height: 10px !important;
            height: 15px !important;
        }        
        :host >>> delete-icon {
            font-size: 10px !important;
            height: 10px !important;
        }        
        :host >>> delete-icon svg {
            height: 10px !important;
        }
        
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
                    <tag-input [ngModel]="form.get('tags').value"  formControlName="tags" [theme]="'minimal'">
                        <!--<tag-input-dropdown [autocompleteItems]="tagDropdown"></tag-input-dropdown>-->
                    </tag-input>
                </div>
            </div>
        </div>
    `
})
export class GuestListItemGuestComponent implements OnInit, OnChanges {
    items = ['Pizza', 'Pasta', 'Parmesan'];
    @Input() matchFilter: boolean;
    @Input() form: FormGroup;
    @Input() tags: string[];
    @Output() tagsValueChanged = new EventEmitter();

    ngOnInit(): void {

        console.log('BOUUUUUUUUUUU',(this.form.get('tags') as FormControl).value);
        /*(this.form.get('tags') as FormControl).valueChanges
            .map(({value}) => value);*/
        //this.tagValues = (this.form.get('tags') as FormArray).controls.reduce((acc, one) => acc.concat(one.value), []);
        this.tagDropdown = this.tags;
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
