import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {GuestListComponent} from "./guest/guest-list/guest-list.component";
import {InMemoryGuestService} from "./services/api.guests.services";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {GuestModule} from "./guest/guest.module";


@NgModule({
  declarations: [
    AppComponent,
    GuestListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryGuestService),
    GuestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
