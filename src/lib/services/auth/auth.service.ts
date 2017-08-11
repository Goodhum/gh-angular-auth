import { Injectable } from '@angular/core';

import { Auth0Service } from '../auth0/auth0.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ProvidersConfig, Provider } from './../../models';

@Injectable()
export class AuthService {

    private auth0;
    private firebase;

    constructor(
        private config: ProvidersConfig,
        private auth0Provider: Auth0Service,
        private firebaseProvider: FirebaseService
    ) {
        if (config.auth0) { this.auth0 = auth0Provider; }
        if (config.firebase) { this.firebase = firebaseProvider; }
    }

    provider(provider: string): Provider {
        return this[provider.toLowerCase()];
    }

}
