import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Auth0Config, Auth0Service } from 'lib/services/auth0/auth0.service';
import { FirebaseConfig, FirebaseService } from 'lib/services/firebase/firebase.service';
import { AuthService, InjectableProvidersServices } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { LoginPage } from 'lib/pages/login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [LoginPage],
    providers: [
        UserService
    ],
    exports: [LoginPage]
})
export class AuthModule {
    static initializeApp(config): ModuleWithProviders {
        const providers = [];
        if (config.auth0) {
            providers.push({ provide: Auth0Config, useValue: config.auth0 });
            providers.push({ provide: Auth0Service, useClass: Auth0Service, deps: [Http, Auth0Config] });
        }

        if (config.firebase) {
            providers.push({ provide: FirebaseConfig, useValue: config.firebase });
            providers.push({ provide: FirebaseService, useClass: FirebaseService, deps: [FirebaseConfig] });
        }
        providers.push({ provide: InjectableProvidersServices, useValue: { providers: Object.keys(config) } });
        providers.push({ provide: AuthService, useClass: AuthService, deps: [Injector, InjectableProvidersServices] });
        return {
            ngModule: AuthModule,
            providers: providers
        };
    }
}
