import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { Provider, User } from '../../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../local-storage.service';

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

    constructor(private ls: LocalStorageService, private config: FirebaseConfig) {
        this.fb = firebase.initializeApp(config);
        this.ls.initialize('firebase');
    }

    logout(): Observable<any> {
        this.ls.clearLocalStorage();
        return Observable.fromPromise(this.fb.auth().signOut());
    }

    login(user: User): Observable<any> {
        const response = new BehaviorSubject<any>({});
        this.fb.auth().signInWithEmailAndPassword(user.username, user.password)
            .then(res => {
                const jsonRes = res.toJSON();
                this.ls.userProfile = {
                    name: jsonRes.displayName,
                    email: jsonRes.email,
                    photoUrl: jsonRes.photoURL,
                    phoneNumber: jsonRes.phoneNumber
                };
                this.ls.token = jsonRes.stsTokenManager.accessToken;
                response.next(jsonRes);
            });
        return response;
    }

}
