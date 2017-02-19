/**
 * Created by Joni on 26/01/2017.
 */
import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";


@Component({
    selector: 'wg-tag-switch',
    styles: [`
        .active {
            background-color: #449d44;
        }
    `],
    template: `
        <div class="row">
            <div class="col-sm-4">
                <div [(ngModel)]="model" (ngModelChange)="tagSwitch.emit($event)" ngbRadioGroup>
                    <label class="btn btn-secondary btn-sm">
                        <input type="radio" [value]="tag"> Yes
                    </label>
                    <label class="btn btn-secondary btn-sm">
                        <input type="radio" value=""> -
                    </label>
                    <label class="btn btn-secondary btn-sm">
                        <input type="radio" value="!{{tag}}"> No
                    </label>
                </div>
            </div>
            <div class="col-sm-8">{{tag}}</div>
        </div>
    `
})
export class TagSwitchComponent implements OnChanges {

    model: string = '';

    @Input() query: string;
    @Input() tag: string;
    @Output() tagSwitch = new EventEmitter();

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['query'] && JSON.stringify(changes['query'].previousValue) !== JSON.stringify(changes['query'].currentValue)) {
            if (this.query.includes(`!${this.tag}`)) {
                this.model = `!${this.tag}`;
            }
            else if (this.query.includes(this.tag)) {
                this.model = this.tag;
            }
            else {
                this.model = '';
            }
        }
    }
}
