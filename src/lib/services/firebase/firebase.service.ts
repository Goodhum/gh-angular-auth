import { Injectable } from '@angular/core';
import { Provider } from 'lib/models';
import { Observable } from 'rxjs/Rx';
import { User } from 'lib/models/user.model';

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
