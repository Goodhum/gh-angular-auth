import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoginPage } from './pages/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { Auth0Service } from './services/auth0/auth0.service';
import { FirebaseService } from './services/firebase/firebase.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [
        LoginPage
    ],
    exports: [
        LoginPage
    ],
    providers: [
        FirebaseService,
        AuthService,
        UserService,
        Auth0Service
    ]
})
export class AuthModule {}
