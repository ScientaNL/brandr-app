import {Inject, Injectable, InjectionToken} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

export const BRANDrApiUrl = new InjectionToken<string>('BRANDr-api-url');

export interface BRANDrApiResult {
  uri: string;
  extractions: {
    logo: {
      guesses: string[],
      'dom-logo': string,
      'meta-logo': string,
      'social-logo': string
    },
    color: {
      colors: string[],
      grays: string[]
    }
  };
}

export class BRANDrApiData {
  raw: BRANDrApiResult;

  uri: string;
  logo: string;
  colors: string[];
  grays: string[];

  constructor(apiResult: BRANDrApiResult) {
    this.raw = apiResult;
    this.uri = apiResult.uri;
    this.logo = apiResult.extractions.logo.guesses[0] || null;
    this.colors = apiResult.extractions.color.colors;
    this.grays = apiResult.extractions.color.grays;
  }
}

@Injectable()
export class BRANDrApiService {

  private lastResultSource = new ReplaySubject<BRANDrApiData>();
  public lastResult = this.lastResultSource.asObservable();

  constructor(private http: HttpClient, @Inject(BRANDrApiUrl) private  apiUrl: string) {
  }

  fetch(url: string): (Observable<BRANDrApiData> | false) {

    if (url.indexOf('http://') === -1 && url.indexOf('https://') == -1 ) {
      url = `http://${url}`;
    }

    let requestUrl = `${this.apiUrl}/extract/${encodeURIComponent(url)}`;
    let request = this.http.get(requestUrl).pipe(map((res:BRANDrApiResult) => new BRANDrApiData(res)));
    request.subscribe(res => this.lastResultSource.next(res));
    return request;
  }

}
