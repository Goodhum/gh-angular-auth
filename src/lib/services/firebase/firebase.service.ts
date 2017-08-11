import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';

import { Provider, User, ProvidersConfig } from '../../models';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class FirebaseService implements Provider {
    private fb: firebase.app.App;

    constructor(
        private ls: LocalStorageService,
        private config: ProvidersConfig
    ) {
        if (config.firebase) {
            this.fb = firebase.initializeApp(config.firebase);
            this.ls.initialize('firebase');
        }
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
