import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

export function configFactory(config: ConfigService, httpClient: HttpClient) {
    return () => Promise.all([
        new Promise((resolve, reject) => {
            httpClient.get('/api-endpoint').toPromise().then((value: string) => {
                config.apiEndpoint = value;

                httpClient.get(`${config.apiEndpoint}`).toPromise().then(
                    (response: {version: string}) => {
                        config.apiVersion = response.version;
                        resolve();
                    },
                    () => reject()
                );
            }, () => reject());
        }),
        httpClient.get('/app-version').toPromise().then((value: string) => config.appVersion = value),
    ]);
}
