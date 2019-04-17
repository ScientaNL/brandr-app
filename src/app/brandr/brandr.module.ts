import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {BRANDrApiService} from './brandr-api.service';
import {LogoImageComponent} from './logo-image/logo-image.component';
import {StyleColorComponent} from './style-color/style-color.component';

@NgModule({
    declarations: [LogoImageComponent, StyleColorComponent],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [BRANDrApiService],
    exports: [
        LogoImageComponent,
        StyleColorComponent
    ]
})
export class BRANDrModule {
}
