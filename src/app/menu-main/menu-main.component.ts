import {Component} from '@angular/core';
import {BRANDrApiService} from '../brandr/brandr-api.service';

@Component({
    selector: 'app-menu-main',
    templateUrl: './menu-main.component.html',
    styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent {

    constructor(public BRANDr: BRANDrApiService) {
    }
}
