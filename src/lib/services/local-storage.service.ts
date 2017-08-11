import { Injectable } from '@angular/core';

// Local Storage Variables
export function localStorageVariable(provider) {
    return {
        userProfile: provider + 'userProfile',
        token: provider + 'token'
    };
};

@Injectable()
export class LocalStorageService {
    lsv: any;

    constructor() { }

    initialize(provider) {
        this.lsv = localStorageVariable(provider);
        localStorage.setItem('loggedInProvider', (provider || 'firebase'));
    }

    get loggedInProviders() {
        return localStorage.getItem('loggedInProvider');
    }

    set userProfile(user: Object) {
        localStorage.setItem(this.lsv.userProfile, JSON.stringify(user));
    }

    get userProfile(): Object {
        return JSON.parse(localStorage.getItem(this.lsv.userProfile));
    }

    set token(token) {
        localStorage.setItem(this.lsv.token, token);
    }

    get token() {
        return localStorage.getItem(this.lsv.token);
    }

    clearLocalStorage() {
        Object.keys(this.lsv).forEach(key => {
            localStorage.removeItem(this.lsv[key]);
        });
    }
}
