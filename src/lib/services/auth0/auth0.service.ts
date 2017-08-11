import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { Provider, User, ProvidersConfig } from '../../models';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class Auth0Service implements Provider {
    // TODO: Should be moved to be part of external config.
    //       The end user might want to be able to set these.
    private authConfig = {
        scope: 'openid',
        realm: 'Username-Password-Authentication',
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm'
    };
    private url: string;

    constructor(
        private ls: LocalStorageService,
        private http: Http,
        private config: ProvidersConfig
    ) {
        if (config.auth0) {
            this.url = 'https://' + config.auth0.domain + '/oauth/token';
            this.authConfig = Object.assign(this.authConfig, config.auth0);
            this.ls.initialize('firebase');
        }
    }

    login(user: User): Observable<any> {
        this.http.post(this.url, Object.assign(this.authConfig, user))
                 .subscribe(res => {
                     this.ls.token = res.json().id_token;
                     console.log(res.json())
                 })
        return this.http.post(this.url, Object.assign(this.authConfig, user));
    };

    logout() {
        this.ls.clearLocalStorage();
    };

    getUserProfileFromToken(token) {
        console.log('token', token);
        return new JwtHelper().decodeToken(token);
    }

}
