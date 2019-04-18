import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public apiEndpoint: string;
    public apiVersion: string;
    public appVersion: string;
}
