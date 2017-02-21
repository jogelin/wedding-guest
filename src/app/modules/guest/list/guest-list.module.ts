import {NgModule} from '@angular/core';
import {GuestListComponent} from './guest-list.component';
import {SharedModule} from '../../shared/shared.module';
import {GuestListItemComponent} from './guest-list-item.component';
import {GuestListItemGuestComponent} from './guest-list-item-guest.component';
import {TagInputModule} from 'ng2-tag-input';
import {FormsModule} from '@angular/forms';
import {TagInputComponent} from './tag-input.component';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        TagInputModule
    ],
    declarations: [
        GuestListComponent,
        GuestListItemComponent,
        GuestListItemGuestComponent,
        TagInputComponent
    ],
    exports: [
        GuestListComponent
    ]
})
export class GuestListModule {
}

