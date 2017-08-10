import { AuthModule } from './../lib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// export function config() {
//     return {
//         firebase: {
//             apiKey: '',
//             authDomain: '',
//             databaseURL: '',
//             projectId: '',
//             storageBucket: '',
//             messagingSenderId: ''
//         },
//         auth0: {
//             domain: '',
//             client_id: ''
//         }
//     }
// };
export const config = {
    firebase: {
        apiKey: 'AIzaSyD2hChUJB6N75nT2hxDYaCR4JpEA75J4js',
        authDomain: 'tna-angular-july-2017.firebaseapp.com',
        databaseURL: 'https://tna-angular-july-2017.firebaseio.com',
        projectId: 'tna-angular-july-2017',
        storageBucket: 'tna-angular-july-2017.appspot.com',
        messagingSenderId: '21902715174'
    },
    auth0: {
        domain: 'mikkokam.eu.auth0.com',
        client_id: 'QB3X9JOtona4zH89GFdI0X7nO5kAvNeO'
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
