import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Provider } from 'lib/models';
import { JwtHelper } from 'angular2-jwt';
import { User } from 'lib/models/user.model';

export const Auth0Config = {
    'client_id': 'YOUR CLIENT ID',
    'scope': 'openid',
    'username': '',
    'password': '',
    'realm': 'Username-Password-Authentication',
    'grant_type': 'http://auth0.com/oauth/grant-type/password-realm'
};


@Injectable()
export class Auth0Service implements Provider {

    url = 'https://{{YOUR-DOMAIN}}/oauth/token';

    constructor(private http: Http) { }

    login(user: User): Observable<any> {
        return this.http.post(this.url, Object.assign(Auth0Config, user));
    };

    logout() {};

    getUserProfileFromToken(token) {
        return new JwtHelper().decodeToken(token);
    }

}
