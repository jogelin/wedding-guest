import {Routes, RouterModule} from "@angular/router";
import {GuestPageComponent} from "./modules/guest/guest-page.component";
/**
 * Created by Joni on 28/12/2016.
 */

const routes: Routes = [
    {path: '', redirectTo: 'guests', pathMatch: 'full'},
    {path: 'guests', component: GuestPageComponent}
];

export const RoutesModule = RouterModule.forRoot(routes);
