import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'lib/services/user/user.service';

@Component({
    selector: 'gh-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {
    loggedData: any;

    constructor(public auth: AuthService, private userservice: UserService) { }

    authProvider: any;

    ngOnInit() {
        const provider = this.userservice.getLoggedInProvider();
        if (provider) {
            this.authProvider = this.auth.provider(provider);
        }
    }

    login(provider, username, password) {
        const user = { username: username, password: password };
        this.authProvider = this.auth.provider(provider);
        this.authProvider.login(user).subscribe(res => this.loggedData = res);
    }

    logout() {
        this.authProvider.logout();
    }

}
