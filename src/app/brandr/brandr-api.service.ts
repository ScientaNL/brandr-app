import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConfigService} from './config.service';

export interface BRANDrApiResult {
    uri: string;
    extractions: {
        logo: string[],
        'dom-logo': string,
        'meta-logo': string,
        'social-logo': string
        'site-style': any[]
    };
}

export class BRANDrApiSimpleData {
    public uri: string;
    public logo: string;
    public colors: string[];
    public grays: string[];

    constructor(apiResult: BRANDrApiResult) {
        this.uri = apiResult.uri;
        this.logo = apiResult.extractions.logo[0] || null;
        this.colors = apiResult.extractions['site-style'][0].colors;
        this.grays = apiResult.extractions['site-style'][0].grays;
    }
}

export class BRANDrApiCompleteData {
    public domLogo: any;
    public socialLogo: string;
    public metaLogo: string;

    public guesses: string[];
    public colors: any;
    public grays: string[];

    constructor(apiResult: BRANDrApiResult) {
        this.guesses = apiResult.extractions.logo;
        this.domLogo = apiResult.extractions['dom-logo'];
        this.socialLogo = apiResult.extractions['social-logo'];
        this.metaLogo = apiResult.extractions['meta-logo'];
        this.colors = apiResult.extractions['site-style'][0].colors;
        this.grays = apiResult.extractions['site-style'][0].grays;

        console.log(this);
    }
}

@Injectable()
export class BRANDrApiService {

    private apiUrl: string;

    private lastResultSource = new ReplaySubject<BRANDrApiResult>(1);
    public lastResult = this.lastResultSource.asObservable();

    public lastCompleteData = this.lastResultSource.pipe(map((res: BRANDrApiResult) => res ? new BRANDrApiCompleteData(res) : null));
    public lastSimpleData = this.lastResultSource.pipe(map((res: BRANDrApiResult) => res ? new BRANDrApiSimpleData(res) : null));

    private stateSource = new ReplaySubject<('start' | 'loading' | 'loaded' | 'error')>();
    public state = this.stateSource.asObservable();

    constructor(private http: HttpClient, config: ConfigService) {
        this.apiUrl = config.apiEndpoint;

        this.lastResult.subscribe((res) => console.log(res));
        this.stateSource.next('start');
    }

    public fetch(url: string): (Observable<BRANDrApiResult> | false) {

        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = `http://${url}`;
        }

        this.lastResultSource.next(null);
        this.stateSource.next('loading');

        const requestUrl = `${this.apiUrl}/extract/`;
        const request = this.http.post(requestUrl, {endpoint: url}) as Observable<BRANDrApiResult>;

        request.subscribe((res: BRANDrApiResult) => {
            this.lastResultSource.next(res);
            this.stateSource.next('loaded');
        }, () => {
            this.lastResultSource.next(null);
            this.stateSource.next('error');
        });

        return request;
    }
}
