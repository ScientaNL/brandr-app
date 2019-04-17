import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BRANDrApiService} from '../brandr/brandr-api.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent {

    constructor(public BRANDr: BRANDrApiService) {
        this.BRANDr.fetch("https://tweakers.net")
    }
}
