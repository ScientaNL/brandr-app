import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'app-logo-image',
    templateUrl: './logo-image.component.html',
    styleUrls: ['./logo-image.component.scss']
})
export class LogoImageComponent implements AfterViewInit {

    @Input() public logo: string;

    @ViewChild('logoElm') public logoElmRef: ElementRef;

    private logoSubject = new ReplaySubject<string>(1);

    public logoWidth: number = 0;
    public logoHeight: number = 0;

    public logoExtension: string;

    constructor(private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {
    }

    public ngAfterViewInit() {
        const imgElm = this.logoElmRef.nativeElement as HTMLImageElement;
        this.renderer.listen(imgElm, 'load', () => {
            this.logoWidth = imgElm.naturalWidth;
            this.logoHeight = imgElm.naturalHeight;

            const matches = this.logo.match(/\.(\w+)$/);
            if (matches) {
                this.logoExtension = matches[1].toUpperCase();
            }

            this.changeDetectorRef.detectChanges();
        });
    }
}
