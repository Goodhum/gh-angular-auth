import { Injectable, Injector } from '@angular/core';
import { Auth0Service } from 'lib/services/auth0/auth0.service';
import { FirebaseService } from 'lib/services/firebase/firebase.service';

export class InjectableProvidersServices {
    providers: any[];
}

@Injectable()
export class AuthService {
    private auth0;
    private firebase;

    constructor(private injector: Injector, config?: InjectableProvidersServices) {
        if (config.providers.indexOf('firebase') !== -1) {
            this.firebase = this.injector.get(FirebaseService);
        }
        if (config.providers.indexOf('auth0') !== -1) {
            this.auth0 = this.injector.get(Auth0Service);
        }
    }

    provider(provider) {
        return this[provider.toLowerCase()];
    }
}
