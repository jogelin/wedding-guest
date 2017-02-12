import {NgModule} from '@angular/core';
import {GuestListComponent} from './guest-list.component';
import {SharedModule} from '../../shared/shared.module';
import {GuestListItemComponent} from './guest-list-item.component';
import {GuestListItemGuestComponent} from './guest-list-item-guest.component';
import {Select2Module} from "ng2-select2";

@NgModule({
    imports: [
        SharedModule,
        Select2Module
    ],
    declarations: [
        GuestListComponent,
        GuestListItemComponent,
        GuestListItemGuestComponent
    ],
    exports: [
        GuestListComponent
    ]
})
export class GuestListModule {
}

