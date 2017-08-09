import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { Provider, User } from '../../models';

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

    constructor(private http: Http, private config?: Auth0Config) {
        this.url = 'https://' + config['domain'] + '/oauth/token';
        this.authConfig = Object.assign(this.authConfig, config);
    }

    login(user: User): Observable<any> {
        localStorage.setItem('loggedInProvider', 'auth0')
        if (localStorage.getItem('auth0')) {
            return Observable.of(JSON.parse(localStorage.getItem('auth0')));
        }
        this.http.post(this.url, Object.assign(this.authConfig, user))
                 .subscribe(res => localStorage.setItem('auth0', JSON.stringify(res)))
        return this.http.post(this.url, Object.assign(this.authConfig, user));
    };

    logout() {
        localStorage.removeItem('auth0')
    };

    getUserProfileFromToken(token) {
        return new JwtHelper().decodeToken(token);
    }

}
