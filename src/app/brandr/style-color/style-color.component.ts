import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'app-style-color',
    templateUrl: './style-color.component.html',
    styleUrls: ['./style-color.component.scss']
})
export class StyleColorComponent {

    @Input() color: string;
    @Input() title: string;

    @HostBinding('class.horizontal') @Input() public horizontal: boolean = false;
}
