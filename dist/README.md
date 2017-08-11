# gh-angular-auth

`gh-angular-auth` is a module you can add to your Angular4+ app in order to quickly setup Auth0 and Firebase authentication support.

## Install

```shell
npm install @goodhum/gh-angular-auth
```

## Usage

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
### Initialization

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GhAuthModule, ProvidersConfig } from '@goodhum/gh-angular-auth';

import { AppComponent } from './app.component';


const config: ProvidersConfig = {
    // Your configuration for the providers you want to use
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

### Methods

```ts
// Get the provider you want to use. 'auth0' / 'firebase'
AuthService.provider(provider: string): Provider

// Login with provider
Provider.login(user: User): Observable<any>

// Logout with provider
Provider.logout(): void

// Get providers that have been logged in with
UserService.getLoggedInProvider(): string

// Get user profile
UserService.getUserProfile(): Object

// Get user profile from jwt token
UserService.getUserProfileFromToken: Object

// Get user JWT token
UserService.getToken(): string

// Get can activate
UserService.canActivate(): Observable<boolean>

// Get if user is authenticated
UserService.isAuthenticated(): boolean

```

### Examples

```ts
// Login with firebase
AuthService.provider('firebase').login({
    username: 'username', 
    password: 'password' 
});
```

## License

MIT
