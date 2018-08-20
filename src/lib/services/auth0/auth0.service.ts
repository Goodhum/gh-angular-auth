import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auth0Config, Provider, ProvidersConfig, User } from '../../models';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class Auth0Service implements Provider {
    // These are the default settings for auth0 it can be overridden by the configuration provided by the user
    private authConfig: Auth0Config = {
        domain: '',
        client_id: '',
        scope: 'openid',
        realm: 'Username-Password-Authentication',
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm'
    };
    private url: string;

    constructor(private ls: LocalStorageService,
                private http: Http,
                private config: ProvidersConfig) {
        if (config.auth0) {
            // Construct an absolute url from the domain provided.
            this.url = 'https://' + config.auth0.domain + '/oauth/token';

            // Merge the default configuration with the configuration provided by the user.
            this.authConfig = Object.assign(this.authConfig, config.auth0);
        }
    }

    login(user: User): Observable<any> {
        // console.log(this.url, Object.assign(this.authConfig, user))
        return this.http.post(this.url, Object.assign(this.authConfig, user))
            .pipe(map(res => {
                const jsonRes = JSON.parse(res['_body']);
                // Sets the local storage with the jwt token obtained from auth0 login.
                this.ls.token = jsonRes.id_token;
                return jsonRes;
            }));
    }

    // Clear the localstorage related with authO
    logout() {
        this.ls.clearLocalStorage();
        return of(true);
    }


    // Sign up using email and password
    signUp(user: User): Observable<any> {
        const data = {
            ClientId: this.authConfig.client_id,
            email: user.username,
            password: user.password,
            connection: this.authConfig.realm,
            user_metadata: user.user_metadata || {}
        };

        // Create an api url from the domain.
        const singUpURL = 'https://' + this.authConfig.domain + '/dbconnections/signup';
        return this.http.post(singUpURL, data).pipe(map(res => res.json()));
    }

    // Reset password request to email.
    resetPassword(email: string): Observable<any> {
        const data = {
            ClientId: this.authConfig.client_id,
            email: email,
            connection: this.authConfig.realm
        };

        // Create an api url from the domain.
        const passResetURL = 'https://' + this.config.auth0.domain + '/dbconnections/change_password';
        return this.http.post(passResetURL, data).pipe(map(res => res));
    }
}
