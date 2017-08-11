# gh-angular-auth

`gh-angular-auth` is a module you can add to your Angular4+ app in order to quickly add Auth0 and Firebase authentication support.

## Install

```shell
npm install @goodhum/gh-angular-auth
```

## Usage

### Initialization and Configuration

```ts
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

// Get user JWT token
UserService.getToken(): string
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
