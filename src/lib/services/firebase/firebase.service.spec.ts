import { TestBed, inject } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { LocalStorageService } from '../../../lib/services';
import { ProvidersConfig } from '../../../lib/models';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, XHRBackend } from '@angular/http';

describe('FirebaseService', () => {
    const ls: LocalStorageService = new LocalStorageService();
    const pc: ProvidersConfig = {
        firebase: {
            apiKey: 'apikey',
            authDomain: 'test.com',
            databaseURL: 'database.com',
            projectId: 'test-id',
            storageBucket: 'bucket',
            messagingSenderId: 'senderid'
        }
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FirebaseService,
                LocalStorageService,
                ProvidersConfig,
                MockBackend,
                BaseRequestOptions,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
        ls.initialize('firebase');
    });

    it('should be created', inject([FirebaseService], (service: FirebaseService) => {
        expect(service).toBeTruthy();
    }));
});
