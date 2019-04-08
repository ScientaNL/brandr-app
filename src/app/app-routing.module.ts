import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageHomeComponent} from "./page-home/page-home.component";
import {PageAboutComponent} from "./page-about/page-about.component";

const routes: Routes = [
	{path: 'about', component: PageAboutComponent},
	{path: '**', component: PageHomeComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
