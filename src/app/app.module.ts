import { AuthModule } from './../lib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

const config = {
    firebase: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: ''
    },
    auth0: {
        domain: '',
        client_id: ''
    }
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule.initializeApp(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
