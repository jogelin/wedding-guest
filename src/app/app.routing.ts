import {Routes, RouterModule} from "@angular/router";
import {GuestListComponent} from "./guest/guest-list.component";
/**
 * Created by Joni on 28/12/2016.
 */

const routes: Routes = [
  // { path: '', redirectTo: '/guests', pathMatch: 'full' },
  { path: 'guests',  component: GuestListComponent }
];

export const RoutesModule = RouterModule.forRoot(routes);
