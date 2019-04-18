import {Component} from '@angular/core';
import {ConfigService} from './brandr/config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public year;

    constructor(public config: ConfigService) {
        this.year = (new Date()).getFullYear();
    }
}
