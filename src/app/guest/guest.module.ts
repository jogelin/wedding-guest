import {NgModule} from "@angular/core";
import {GuestListComponent} from "./guest-list/guest-list.component";
import {CommonModule} from "@angular/common";
import {GuestService} from "./guest.service";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [GuestListComponent],
  declarations: [GuestListComponent],
  providers: [GuestService],
})
export class GuestModule {
}

