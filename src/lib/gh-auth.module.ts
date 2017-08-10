import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AuthService, InjectableProvidersServices } from './services/auth/auth.service';
import { Auth0Config, Auth0Service } from './services/auth0/auth0.service';
import { FirebaseConfig, FirebaseService } from './services/firebase/firebase.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user/user.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [],
    providers: [
        UserService,
        LocalStorageService
    ],
    exports: []
})
export class GhAuthModule {
    static initializeApp(config) {
        return {
            ngModule: GhAuthModule,
            providers: [
                { provide: Auth0Config, useValue: config.auth0 },
                { provide: Auth0Service, useClass: Auth0Service, deps: [LocalStorageService, Http, Auth0Config] },

                { provide: FirebaseConfig, useValue: config.firebase },
                { provide: FirebaseService, useClass: FirebaseService, deps: [LocalStorageService, FirebaseConfig] },


                { provide: InjectableProvidersServices, useValue: { providers: Object.keys(config) } },
                { provide: AuthService, useClass: AuthService, deps: [Injector, InjectableProvidersServices] }
            ]
        };
    }
}


