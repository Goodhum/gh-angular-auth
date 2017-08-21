import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ProvidersConfig } from 'lib/models';
import { LocalStorageService } from 'lib/services';
import { Auth0Service } from 'lib/services/auth0/auth0.service';
import { FirebaseService } from 'lib/services/firebase/firebase.service';
import { HttpModule } from '@angular/http';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ProvidersConfig,
                LocalStorageService,
                Auth0Service,
                FirebaseService,
                AuthService
            ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
