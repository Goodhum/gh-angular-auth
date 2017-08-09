import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { Provider, User } from '../../models';

@Injectable()
export class FirebaseService implements Provider {

    constructor() { }

    login(user: User): Observable<any> {
        return Observable.of({'message': 'Logged from Firebase'});
    }

    logout() {
        return 'Logged out from Firebase';
    }

}
