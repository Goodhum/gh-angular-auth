import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
            // Initialize the firebase with the config provided.
            this.fb = firebase.initializeApp(config.firebase);
        }
    }


    // Logout from the firebase and clear the local storage
    logout() {
        this.ls.clearLocalStorage();
        this.fb.auth().signOut();
    }

    login(user: User): Observable<any> {
        return Observable.create(ovserver => {
            const ob = ovserver;
            this.fb.auth().signInWithEmailAndPassword(user.username, user.password)
                .then(res => {
                    const jsonRes = res.toJSON();

                    // Sets the local storage with the jwt token obtained from firebase login.
                    this.ls.token = jsonRes.stsTokenManager.accessToken;

                    // Publish the new value to an observable
                    ob.next(jsonRes);

                    // Complete the observable
                    ob.complete();
                });
        });
    }

}
