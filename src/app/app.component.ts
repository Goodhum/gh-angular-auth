import { Component, OnInit } from '@angular/core';
import { AuthService } from 'lib/services/auth/auth.service';
import { UserService } from 'lib/services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedData: any;

    constructor(public auth: AuthService,
                private userservice: UserService) { }

    authProvider: any;

    ngOnInit() {
        const provider = this.userservice.getLoggedInProvider();
        console.log(provider);
        if (provider) {
            this.authProvider = this.auth.provider(provider);
        }
    }

    login(provider, username, password) {
        const user = { username: username, password: password };
        this.authProvider = this.auth.provider(provider);
        this.authProvider.login(user).subscribe(res => {
            this.loggedData = res;
            console.log(this.userservice.getToken())
        });
    }

    logout() {
        this.authProvider.logout();
    }
}
