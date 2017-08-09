import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor() { }

    getLoggedInProvider() {
        return localStorage.getItem('loggedInProvider')
    }
}
