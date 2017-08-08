import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

enum ProviderKey {
    FIREBASE,
    AUTH0
}

@Injectable()
export class AuthService {

    selectedProvider: ProviderKey
    firebase: FirebaseService
    auth0: any

    constructor() {}

    login() {
        switch (this.selectedProvider) {
            case ProviderKey.FIREBASE: {} break;
            case ProviderKey.AUTH0: {} break;
            default: {}
        }
    }

}
