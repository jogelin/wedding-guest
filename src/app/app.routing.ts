import {Routes, RouterModule} from "@angular/router";
import {GuestPageComponent} from "./modules/guest/guest-page.component";
import {ReportPageComponent} from "./modules/report/report-page.component";
/**
 * Created by Joni on 28/12/2016.
 */

const routes: Routes = [
    {path: '', redirectTo: 'guests', pathMatch: 'full'},
    {path: 'guests', component: GuestPageComponent},
    {path: 'report', component: ReportPageComponent}
];

export const RoutesModule = RouterModule.forRoot(routes);
