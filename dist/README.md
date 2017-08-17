# gh-angular-auth

`gh-angular-auth` is a module you can add to your Angular4+ app in order to quickly setup Auth0 and Firebase authentication support.

### Install

```shell
npm install --save @goodhum/gh-angular-auth
```

### Pre Setup
#### Firebase
```
Login to your firebase console and enable the sign-in method for the providers you want to use from Authentication Menu on left side.
```

#### Auth0 (Only if you want to get user meta_data)

```
 1. Login to auth 0.
 2. Click on Rules menu from left.
 3. Create a rule.
 4. Select empty rule.
 5. Give a name 'attach appmetadata'
 6. Update the function with the following settings 
         function (user, context, callback) {
           var namespace = 'https://<YOUR-DOMAIN>/';
           context.idToken[namespace + 'app_metadata'] = user.app_metadata; 
           
           callback(null, user, context);
         }
 7. Save the rule
```

### Configuration
```
export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}

export interface Auth0Config {
    domain: string;
    client_id: string;
    scope?: string;
    realm?: string;
    grant_type?: string;
}

export abstract class ProvidersConfig {
    firebase?: FirebaseConfig;
    auth0?: Auth0Config;
};

```

### Methods

#### Auth Service

| Methods                                | Notes                                                       |
|----------------------------------------|-------------------------------------------------------------|
| provider(provider: string): Provider   | Get the provider you want to use. 'auth0' or 'firebase'.    |
| login(user: User): Observable<any>     | Login with provider.                                        |
| logout(): void                         | Logout of the provider.                                     |
| signUp(): void                         | SignUp with email and password to the desired provider.     |
| resetPassword(): void                  | Request a reset password link to email for desired provider.|



#### User Service

| Methods                                | Notes                                                       |
|----------------------------------------|-------------------------------------------------------------|
| getLoggedInProvider(): string          | Get providers that have been logged in with.                |
| getUserProfile(): Object               | Get user profile.                                           |
| getUserProfileFromToken: Object        | Get user profile from jwt token.                            |
| getToken(): string                     | Get user JWT token.                                         |
| canActivate(): Observable<boolean>     | Get can activate.                                           |
| isAuthenticated(): boolean             | Get if user is authenticated.                               |


### Initialization

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GhAuthModule, ProvidersConfig } from '@goodhum/gh-angular-auth';

import { AppComponent } from './app.component';


const config: ProvidersConfig = {
     auth0: {
        YOUR AUTH0 CONFIGURATION 
     },
     firebase: {
        YOUR FIREBASE CONFIGURATION
     }
     redirectUrl: URL to redirect on CanActivate false
};


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GhAuthModule.forRoot(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

```

### Examples

```ts
import { Component, OnInit } from '@angular/core';
import { AuthService, User, UserService } from '@goodhum/gh-angular-auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    authProvider: any;

    constructor(public auth: AuthService,
                private userservice: UserService) { }


    ngOnInit() {
        this.authProvider = this.auth.provider('firebase');
    }

    login(provider, username, password) {
        const user: User = { username: username, password: password };
        
        this.authProvider.login(user).subscribe(res => {
            console.log(res);
        }, error => console.log('Error Login', error));
    }

    logout() {
        this.authProvider.logout().subscribe(res => console.log(res));
    }
}
```

### License

MIT
