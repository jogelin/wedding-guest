import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbButtonsModule

    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        NgbButtonsModule
    ]
})
export class SharedModule {
}

