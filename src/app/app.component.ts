import { Component, OnInit } from '@angular/core';
import { AuthService } from 'lib/services/auth/auth.service';
import { UserService } from 'lib/services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    authProvider: any;
    userProfile = '';
    state = {
        auth0: {
            data: null,
            authenticated: false,
            token: null
        },
        firebase: {
            data: null,
            authenticated: false,
            token: null
        }
    }

    constructor(public auth: AuthService,
                private userservice: UserService) { }


    ngOnInit() {
        if (this.userservice.getLoggedInProvider()) {
            this.authProvider = this.auth.provider(this.userservice.getLoggedInProvider());
            this.updateData(this.userservice.getLoggedInProvider());
        }
    }

    login(provider, username, password) {
        const user = { username: username, password: password };
        this.authProvider = this.auth.provider(provider);
        if (this.userservice.isAuthenticated()) {
            this.updateData(provider);
        } else {
            this.authProvider.login(user).subscribe(res => {
                this.updateData(provider);
            });
        }
    }


    updateData(provider) {
        this.state[provider].data = this.userservice.getUserProfileFromToken();
        this.state[provider].authenticated = this.userservice.isAuthenticated();
        this.state[provider].token = this.userservice.getToken();
    }

    logout() {
        this.authProvider.logout();
    }

}
