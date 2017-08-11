import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';

import {
    AuthService,
    Auth0Service,
    FirebaseService,
    UserService,
    LocalStorageService
} from './services';
import { ProvidersConfig } from './models';
import { LoginPage } from './pages/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [
        LoginPage
    ],
    providers: [
        UserService,
        LocalStorageService
    ],
    exports: [LoginPage]
})
export class GhAuthModule {
    static forRoot(config: ProvidersConfig): ModuleWithProviders {
        return {
            ngModule: GhAuthModule,
            providers: [
                { provide: ProvidersConfig, useValue: config },
                { provide: Auth0Service, useClass: Auth0Service, deps: [ LocalStorageService, Http, ProvidersConfig ] },
                { provide: FirebaseService, useClass: FirebaseService, deps: [ LocalStorageService, ProvidersConfig ] },
                { provide: AuthService, useClass: AuthService, deps: [ ProvidersConfig, Auth0Service, FirebaseService ] }
            ]
        };
    }
}
