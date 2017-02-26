/**
 * Created by Joni on 26/01/2017.
 */
import {Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'wg-tag-input',
    styles: [`
        :host >>> .ng2-tag-input {
            padding: 0px !important;
        } 
        :host >>> tag {
            font-size: 12px !important;
            padding: 2px !important;
            border: 1px solid grey;
            line-height: 12px !important;
            height: 17px !important;
        }   
        :host >>> tag-input-form {
            padding: 2px !important;
            line-height: 12px !important;
        }   
        :host >>> tag-input-form .ng2-tag-input__text-input {
            font-size: 12px !important;
            padding: 0 !important;
            line-height: 12px !important;
            height: 17px !important;
        }        
        :host >>> delete-icon {
            font-size: 12px !important;
            height: 12px !important;
        }        
        :host >>> delete-icon svg {
            height: 12px !important;
        }
    `],
    template: `
        <tag-input [ngModel]="value" (onAdd)="onAdd($event)" (onRemove)="onRemove($event)" [theme]="'minimal'">
            <!--<tag-input-dropdown [autocompleteItems]="tagDropdown"></tag-input-dropdown>-->
        </tag-input>
    `
})
export class TagInputComponent implements OnChanges {
    @Input() control: FormControl;
    @Input() tags: string[];
    value: string[] = [];

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['control'] && JSON.stringify(changes['control'].previousValue.value) !== JSON.stringify(changes['control'].currentValue.value)) {
            this.value = this.control.value;
        }
    }

    onAdd(event) {
        this.control.setValue([...this.control.value, event.value])
    }

    onRemove(event) {
        this.control.setValue(
            this.control.value.filter((i) => {
                return i != event
            })
        );
    }
}
