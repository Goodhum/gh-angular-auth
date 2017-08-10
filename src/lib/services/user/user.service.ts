import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class UserService {

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
}
