import { Injectable } from '@angular/core';
import { Auth0Service } from 'lib/services/auth0/auth0.service';
import { FirebaseService } from 'lib/services/firebase/firebase.service';

@Injectable()
export class AuthService {
    constructor(private auth0: Auth0Service,
                private firebase: FirebaseService) {}

    provider(provider) {
        return this[provider.toLowerCase()];
    }
}
