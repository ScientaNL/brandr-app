import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageHomeComponent} from './page-home/page-home.component';
import {PageApiComponent} from './page-api/page-api.component';

const routes: Routes = [
    {path: 'api', component: PageApiComponent},
    {path: '**', component: PageHomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
