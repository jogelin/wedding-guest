import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GuestModule} from './guest/guest.module';
import {AngularFireModule} from 'angularfire2';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {RoutesModule} from './app.routing';
import {StoreModule} from '@ngrx/store';
import * as fromRoot from './app.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const firebaseConfig = {
  apiKey: 'AIzaSyCJQEGZqv9lEexqfHz5SzQ1wNoCpWgoaps',
  authDomain: 'luminous-inferno-5310.firebaseapp.com',
  databaseURL: 'https://luminous-inferno-5310.firebaseio.com',
  storageBucket: 'luminous-inferno-5310.appspot.com',
  messagingSenderId: '654530681156'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RoutesModule,
    // HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryGuestService),
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot(),
    StoreModule.provideStore(fromRoot.reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // MY
    GuestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
