import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class UserService implements CanActivate {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private ls: LocalStorageService) {
        this.ls.initialize(this.ls.loggedInProviders);
    }

    getLoggedInProvider() {
        return this.ls.loggedInProviders;
    }

    getUserProfile() {
        return this.ls.userProfile;
    }

    getToken() {
        return this.ls.token;
    }

    // Returns user profile from jwt token if present.
    getUserProfileFromToken() {
        if (this.ls.token) {
            return this.jwtHelper.decodeToken(this.ls.token);
        } else {
            return { 'Error': 'Token not found' };
        }
    }

    canActivate(): Observable<boolean> {
        return Observable.of(this.isAuthenticated());

    }

    isAuthenticated(): boolean {
        if (this.ls.token && !this.jwtHelper.isTokenExpired(this.ls.token)) {
            return true;
        } else {
            return false;
        }
    }
}
