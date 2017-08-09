import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { Provider, User } from '../../models';

export abstract class FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}

@Injectable()
export class FirebaseService implements Provider {
    private fb: firebase.app.App;

    constructor(private config: FirebaseConfig) {
        this.fb = firebase.initializeApp(config);
    }

    logout() {
        return 'Logged out from Firebase';
    }

    login(user: User): Observable<any> {
        return Observable.fromPromise(this.fb.auth().signInWithEmailAndPassword(user.username, user.password));
    }
}
