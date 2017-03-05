import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ReportPageComponent} from "./report-page.component";
import {EffectsModule} from "@ngrx/effects";
import {ReportEffects} from "./report.effects";
import {ReportService} from "./report.service";
import {GuestModule} from "../guest/guest.module";

@NgModule({
    imports: [
        SharedModule,
        GuestModule,
        EffectsModule.run(ReportEffects)
    ],
    declarations: [
        ReportPageComponent,
    ],
    providers: [
        ReportService
    ],
    exports: [
        ReportPageComponent
    ]
})
export class ReportModule {
}

