import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

export function configFactory(config: ConfigService, httpClient: HttpClient) {
    return () => httpClient.get('/api-endpoint').toPromise()
        .then((value: string) => config.apiEndpoint = value);
}
