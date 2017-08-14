import { Injectable, Injector } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../local-storage.service';
import { ProvidersConfig } from 'lib/models';

@Injectable()
export class UserService implements CanActivate {

    private _jwtHelper: JwtHelper = new JwtHelper();
    private _router: Router;

    constructor(private injector: Injector,
                private ls: LocalStorageService,
                private config: ProvidersConfig) {

        // Initialize the local storage with the current logged in providers
        this.ls.initialize(this.ls.loggedInProviders);

        // Inject the Router service only if the redirectUrl is present in the configuratin.
        if (this.config.redirectUrl) {
            this._router = this.injector.get(Router);
        }
    }

    // Returns the provider to which the user is currently logged in.
    getLoggedInProvider() {
        return this.ls.loggedInProviders;
    }

    // Returns the userprofile from the local storage.
    getUserProfile() {
        return this.ls.userProfile;
    }

    // Returns the jwt token from the local storage.
    getToken() {
        return this.ls.token;
    }

    // Returns user profile from jwt token if present.
    getUserProfileFromToken() {
        if (this.ls.token) {
            return this._jwtHelper.decodeToken(this.ls.token);
        } else {
            return { 'Error': 'Token not found' };
        }
    }

    // Navigate to the url provided in the configuration as redirectUrl if the user is not authenticated.
    // NOTE: if redirectUrl is present and but its not in the Router configuration it will throw a error.
    canActivate(): Observable<boolean> {
        if (!this.isAuthenticated() && this.config.redirectUrl) {
            this._router.navigate([this.config.redirectUrl]);
        }
        return Observable.of(this.isAuthenticated());

    }

    // Checks if the token is present and has not expired.
    isAuthenticated(): boolean {
        if (this.ls.token && !this._jwtHelper.isTokenExpired(this.ls.token)) {
            return true;
        } else {
            return false;
        }
    }
}
