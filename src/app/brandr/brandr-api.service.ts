import {Inject, Injectable, InjectionToken} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

export const BRANDrApiUrl = new InjectionToken<string>('BRANDr-api-url');

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
  uri: string;
  logo: string;
  colors: string[];
  grays: string[];

  constructor(apiResult: BRANDrApiResult) {
    this.uri = apiResult.uri;
    this.logo = apiResult.extractions.logo[0] || null;
    this.colors = apiResult.extractions["site-style"][0].colors;
    this.grays = apiResult.extractions["site-style"][0].grays;
  }
}

export class BRANDrApiCompleteData {
  private domLogo: any;
  private socialLogo: string;
  private metaLogo: string;

  private guesses: string[];
  private colors: any;
  private grays: string[];

  constructor(apiResult: BRANDrApiResult) {
    this.guesses = apiResult.extractions.logo;
    this.domLogo = apiResult.extractions["dom-logo"];
    this.socialLogo = apiResult.extractions["social-logo"];
    this.metaLogo = apiResult.extractions["meta-logo"];
    this.colors = apiResult.extractions["site-style"][0].colors;
    this.grays = apiResult.extractions["site-style"][0].grays;
  }
}

@Injectable()
export class BRANDrApiService {

  private lastResultSource = new ReplaySubject<BRANDrApiResult>();
  public lastResult = this.lastResultSource.asObservable();
  public lastCompleteData = this.lastResultSource.pipe(map((res: BRANDrApiResult) => new BRANDrApiCompleteData(res)));
  public lastSimpleData = this.lastResultSource.pipe(map((res: BRANDrApiResult) => new BRANDrApiSimpleData(res)));

  constructor(private http: HttpClient, @Inject(BRANDrApiUrl) private  apiUrl: string) {
    this.lastResult.subscribe((res) => console.log(res));

  }

  fetch(url: string): (Observable<BRANDrApiResult> | false) {

    if (url.indexOf('http://') === -1 && url.indexOf('https://') == -1) {
      url = `http://${url}`;
    }

    let requestUrl = `${this.apiUrl}/extract/`;
    let request = <Observable<BRANDrApiResult>>this.http.post(requestUrl, {endpoint: url});
    request.subscribe((res: BRANDrApiResult) => this.lastResultSource.next(res));
    return request;
  }

}
