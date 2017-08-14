import { Injectable } from '@angular/core';

import { Auth0Service } from '../auth0/auth0.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ProvidersConfig, Provider } from './../../models';
import { LocalStorageService } from '../local-storage.service';

/*
 * AuthService is a container for all the provider service.
 */


@Injectable()
export class AuthService {

    private auth0;
    private firebase;

    // Register all the service
    constructor(
        private config: ProvidersConfig,
        private ls: LocalStorageService,
        private auth0Provider: Auth0Service,
        private firebaseProvider: FirebaseService
    ) {
        if (config.auth0) { this.auth0 = auth0Provider; }
        if (config.firebase) { this.firebase = firebaseProvider; }
    }


    // It switches between the providers to use.
    provider(provider: string): Provider {
        this.ls.initialize(provider);
        return this[provider.toLowerCase()];
    }

}
