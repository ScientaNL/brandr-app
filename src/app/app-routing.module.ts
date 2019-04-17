import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageHomeComponent} from './page-home/page-home.component';
import {PageApiComponent} from './page-api/page-api.component';
import {Page404Component} from './page-404/page-404.component';

const routes: Routes = [
    {path: '', component: PageHomeComponent, runGuardsAndResolvers: 'always'},
    {path: 'api', component: PageApiComponent},
    {path: '**', component: Page404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
