import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule

    ],
    exports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}

