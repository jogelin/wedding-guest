import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GuestModule} from "./modules/guest/guest.module";
import {AngularFireModule} from "angularfire2";
import {CommonModule} from "@angular/common";
import {RoutesModule} from "./app.routing";
import {StoreModule} from "@ngrx/store";
import * as fromRoot from "./app.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {FilterModule} from "./modules/filter/filter.module";
import {NgbModule, NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {ReportModule} from "./modules/report/report.module";

export const firebaseConfig = {
    apiKey: 'AIzaSyD5bafCnxNFMZddSIk4PzgRLR-uQs1DRKQ',
    authDomain: 'wedding-guest-8c998.firebaseapp.com',
    databaseURL: 'https://wedding-guest-8c998.firebaseio.com',
    storageBucket: 'wedding-guest-8c998.appspot.com',
    messagingSenderId: '1035298718959'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RoutesModule,
        // InMemoryWebApiModule.forRoot(InMemoryGuestService),
        AngularFireModule.initializeApp(firebaseConfig),
        StoreModule.provideStore(fromRoot.reducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        NgbButtonsModule.forRoot(),

        // MY
        GuestModule,
        ReportModule,
        FilterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
