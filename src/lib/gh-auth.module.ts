import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { ProvidersConfig } from './models';
import { LoginPage } from './pages/login/login.component';

import { Auth0Service, AuthService, FirebaseService, LocalStorageService, UserService } from './services';

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
                { provide: AuthService, useClass: AuthService, deps: [ ProvidersConfig, LocalStorageService, Auth0Service, FirebaseService ] }
            ]
        };
    }
}
