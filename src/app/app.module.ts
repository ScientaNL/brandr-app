import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuMainComponent} from './menu-main/menu-main.component';
import {PageHomeComponent} from './page-home/page-home.component';
import {
	MatButtonModule, MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatListModule, MatTableModule,
	MatToolbarModule,
	MatProgressSpinnerModule
} from "@angular/material";
import {PageApiComponent} from './page-api/page-api.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BRANDrModule} from "./brandr/brandr.module";
import {BRANDrApiUrl} from "./brandr/brandr-api.service";

@NgModule({
	declarations: [
		AppComponent,
		MenuMainComponent,
		PageHomeComponent,
		PageApiComponent
	],
	imports: [
		BRANDrModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatButtonModule,
		MatCardModule,
		AppRoutingModule,
		MatListModule,
		MatInputModule,
		MatCardModule,
		MatTableModule,
    MatProgressSpinnerModule
	],
	providers: [
		{ provide: BRANDrApiUrl, useValue: 'http://10.10.11.231:1337' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
