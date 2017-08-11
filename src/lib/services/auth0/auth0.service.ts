import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Provider, ProvidersConfig, User } from '../../models';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class Auth0Service implements Provider {
    // These are the default settings for auth0 it can be overridden by the configuration provided by the user
    private authConfig = {
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
        // Intialize the localstorage to be used by auth0 provider
        return Observable.create(ovserver => {
            const ob = ovserver;
            this.http.post(this.url, Object.assign(this.authConfig, user)).subscribe(res => {
                const jsonRes = res.json();

                // Sets the local storage with the jwt token obtained from auth0 login.
                this.ls.token = jsonRes.id_token;

                // Publish the new value to an observable
                ob.next(jsonRes);

                // Complete the observable
                ob.complete();
            });
        });
    }

    // Clear the localstorage related with authO
    logout() {
        this.ls.clearLocalStorage();
    };
}
