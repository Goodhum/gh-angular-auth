import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';

import { Provider, User, ProvidersConfig } from '../../models';
import { LocalStorageService } from '../local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FirebaseService implements Provider {
    private fb: firebase.app.App;

    constructor(private ls: LocalStorageService,
                private config: ProvidersConfig) {
        if (config.firebase) {
            // Initialize the firebase with the config provided.
            this.fb = firebase.initializeApp(config.firebase);
        }
    }


    // Logout from the firebase and clear the local storage
    logout(): Observable<any> {
        this.ls.clearLocalStorage();
        return from(this.fb.auth().signOut());
    }

    // Login to Firebase with the credentials provided and after a successfull response, JWT token is saved to the
    // local storage. and response is returend
    login(user: User): Observable<any> {

        // Create a behaviour subject with a default value of empty object.
        const behaviourSub = new BehaviorSubject<any>({});

        this.fb.auth().signInWithEmailAndPassword(user.username, user.password)
            .then(res => {
                const jsonRes = JSON.parse(JSON.stringify(res));

                // Sets the local storage with the jwt token obtained from firebase login.
                this.ls.token = jsonRes.stsTokenManager.accessToken;

                // Publish the new value to a behaviour and complete it
                behaviourSub.next(jsonRes);
                behaviourSub.complete();
            })
            .catch(error => {
                // Throw a error of behaviour subject with a type and vaule obtained from promise.
                behaviourSub.error(error);
                behaviourSub.complete();
            });
        return behaviourSub;
    }

    // Sign Up using the email and password.
    signUp(user: User): Observable<any> {
        return from(this.fb.auth().createUserWithEmailAndPassword(user.username, user.password));
    }

    // Reset password request to email.
    resetPassword(email: string): Observable<any> {
        return from(this.fb.auth().sendPasswordResetEmail(email));
    }
}
