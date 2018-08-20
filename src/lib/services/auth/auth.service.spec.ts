import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ProvidersConfig } from '../../models';
import { LocalStorageService } from '../../services';
import { Auth0Service } from '../../services/auth0/auth0.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
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
