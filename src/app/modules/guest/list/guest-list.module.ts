import {NgModule} from "@angular/core";
import {GuestListComponent} from "./guest-list.component";
import {SharedModule} from "../../shared/shared.module";
import {GuestListItem} from "../guest.model";
import {GuestListItemComponent} from "./guest-list-item.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        GuestListComponent,
        GuestListItemComponent
    ],
    exports: [
        GuestListComponent
    ]
})
export class GuestListModule {
}

