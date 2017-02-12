import {NgModule} from "@angular/core";
import {GuestService} from "./guest.service";
import {SharedModule} from "../shared/shared.module";
import {GuestListModule} from "./list/guest-list.module";
import {FilterModule} from "../filter/filter.module";
import {GuestPageComponent} from "./guest-page.component";
import {EffectsModule} from "@ngrx/effects";
import {GuestEffects} from "./guest.effects";
import {HttpModule} from "@angular/http";
import {SidebarModule} from "./sidebar/sidebar.module";

@NgModule({
    imports: [
        SharedModule,
        SidebarModule,
        GuestListModule,
        HttpModule,

        EffectsModule.run(GuestEffects)
    ],
    declarations: [
        GuestPageComponent
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

