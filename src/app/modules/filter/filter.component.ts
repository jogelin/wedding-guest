/**
 * Created by Joni on 26/01/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";

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
    `],
    template: `
        <md-card>
            <md-input-container>
                <input md-input [value]="query" pattern="^([!A-Z]+)( and [!A-Z]+)*" placeholder="Filter the list" (keyup)="filter.emit($event.target.value)">
            </md-input-container>
            Total filtered : {{filteredGuestLength}}<br>
            Total Group : {{filteredGuestGroupLength}}
        </md-card>
    `
})
export class FilterComponent {
    @Input() query: string = '';
    @Input() filtering = false;
    @Output() filter = new EventEmitter<string>();

    @Input() filteredGuestLength: number = 0;
    @Input() filteredGuestGroupLength: number = 0;


    // match with ^([!A-Z]+)( and [!A-Z]+)*
}
