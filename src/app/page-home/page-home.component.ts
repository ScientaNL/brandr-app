import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BRANDrApiService} from '../brandr/brandr-api.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent implements OnDestroy {

    public url: string = '';

    private routeSubscription: Subscription;

    constructor(public BRANDr: BRANDrApiService, private router: Router) {
        this.routeSubscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.reset();
            }
        });
    }

    public reset() {
        this.url = '';
        this.BRANDr.reset();
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
