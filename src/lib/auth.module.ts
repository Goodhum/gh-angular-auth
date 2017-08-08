import { NgModule } from '@angular/core';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { Auth0Service } from 'lib/services/auth0/auth0.service';
import { HttpModule } from '@angular/http';
import { FirebaseService } from 'lib/services/firebase/firebase.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    providers: [
        FirebaseService,
        AuthService,
        UserService,
        Auth0Service
    ]
})
export class AuthModule {}
