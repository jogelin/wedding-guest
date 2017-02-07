import {NgModule} from '@angular/core';
import {GuestListComponent} from './guest-list.component';
import {SharedModule} from '../../shared/shared.module';
import {GuestListItemComponent} from './guest-list-item-guest.component';
import {GuestListItemGuestComponent} from 'guest-list-item.component';

@NgModule({
    imports: [
        SharedModule
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

