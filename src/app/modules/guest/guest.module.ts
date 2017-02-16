import {NgModule} from "@angular/core";
import {GuestService} from "./guest.service";
import {SharedModule} from "../shared/shared.module";
import {GuestListModule} from "./list/guest-list.module";
import {GuestPageComponent} from "./guest-page.component";
import {EffectsModule} from "@ngrx/effects";
import {GuestEffects} from "./guest.effects";
import {HttpModule} from "@angular/http";
import {SidebarModule} from "./sidebar/sidebar.module";
import {TagSwitchComponent} from "./tag-switch.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        SidebarModule,
        GuestListModule,
        HttpModule,
        FormsModule,

        EffectsModule.run(GuestEffects)
    ],
    declarations: [
        GuestPageComponent,
        TagSwitchComponent
    ],
    providers: [
        GuestService
    ],
    exports: [
        GuestPageComponent
    ]
})
export class GuestModule {
}

