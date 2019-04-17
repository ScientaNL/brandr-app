import {Component, Inject, OnInit} from '@angular/core';
import {ConfigService} from '../brandr/config.service';

@Component({
    selector: 'app-page-api',
    templateUrl: './page-api.component.html',
    styleUrls: ['./page-api.component.scss']
})
export class PageApiComponent {

    public apiUrl: string;

    constructor(config: ConfigService) {
        this.apiUrl = config.apiEndpoint;
    }
}
