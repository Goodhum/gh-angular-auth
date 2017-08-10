import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { Provider, User } from '../../models';
import { LocalStorageService } from '../local-storage.service';

export abstract class Auth0Config {
    client_id: string;
    scope?: string;
    realm?: string;
    grant_type?: string;
};


@Injectable()
export class Auth0Service implements Provider {
    private authConfig = {
        scope: 'openid',
        realm: 'Username-Password-Authentication',
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm'
    };
    private url: string;

    constructor(private ls: LocalStorageService, private http: Http, private config?: Auth0Config) {
        this.url = 'https://' + config['domain'] + '/oauth/token';
        this.authConfig = Object.assign(this.authConfig, config);
        this.ls.initialize('firebase');
    }

    login(user: User): Observable<any> {
        this.http.post(this.url, Object.assign(this.authConfig, user))
                 .subscribe(res => {
                     localStorage.setItem('auth0', JSON.stringify(res))
                     console.log(res)
                 })
        return this.http.post(this.url, Object.assign(this.authConfig, user));
    };

    logout() {
        this.ls.clearLocalStorage();
    };

    getUserProfileFromToken(token) {
        return new JwtHelper().decodeToken(token);
    }

}
