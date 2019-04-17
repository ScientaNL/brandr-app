import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef, HostBinding,
    Input,
    Renderer2,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-logo-image',
    templateUrl: './logo-image.component.html',
    styleUrls: ['./logo-image.component.scss']
})
export class LogoImageComponent implements AfterViewInit {

    @Input() public logo: string;
    @ViewChild('logoElm') public logoElmRef: ElementRef;

    public logoWidth: number = 0;
    public logoHeight: number = 0;

    public logoExtension: string;

    @HostBinding('class.small') public isSmall: boolean = false;

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

            const imgDimensions = imgElm.getBoundingClientRect();
            this.isSmall = (imgDimensions.width <= 50 || imgDimensions.height <= 50);

            this.changeDetectorRef.markForCheck();
        });
    }
}
