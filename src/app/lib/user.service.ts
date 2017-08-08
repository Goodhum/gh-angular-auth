import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable()
export class UserService {

    private currentUser: User;

    constructor() {}

    getUser(): User { return this.currentUser; }

    setUser(): User {
        return this.getUser();
    }

}
