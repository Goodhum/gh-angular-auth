import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gh-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {
    loggedData: any;
    constructor(public auth: AuthService) { }

    ngOnInit() {
    }

    login(provider, username, password) {
        const user = {username: username, password: password};
        this.auth.provider(provider).login(user).subscribe(res => this.loggedData = res);
    }

}
