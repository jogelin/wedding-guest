import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FilterComponent} from "./filter.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        FilterComponent
    ],
    exports: [
        FilterComponent
    ]

})
export class FilterModule {
}

