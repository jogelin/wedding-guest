import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ReportPageComponent} from "./report-page.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ReportPageComponent,
    ],
    providers: [
    ],
    exports: [
        ReportPageComponent
    ]
})
export class ReportModule {
}

