import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { GhLoginDialogService } from 'app/services/gh-login-dialog.service';
import { GhSignUpDialogService } from 'app/services/gh-sign-up-dialog.service';
import { User } from 'lib/models/user.model';
import { AuthService } from 'lib/services/auth/auth.service';
import { UserService } from 'lib/services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    authProvider: any;
    provider: any;

    userData: any = {};

    constructor(private snackBar: MdSnackBar,
                public auth: AuthService,
                public userService: UserService,
                private signUpDialogService: GhSignUpDialogService,
                private loginDialogService: GhLoginDialogService,
                private viewContainerRef: ViewContainerRef) { }


    ngOnInit() {
    }

    /*
     * Set Providers you want to use
     */
    setProviders(provider) {
        this.provider = provider;
        this.authProvider = this.auth.provider(this.provider);

        // Get the user profile if user has been logged with the provider.
        if (this.userService.isAuthenticated()) {
            this.userData = this.userService.getUserProfileFromToken();
        } else {
            this.userData = {};
        }
    }

    // Open a login dialogue.
    loginDialog() {
        this.loginDialogService.open(this.viewContainerRef, this.provider).subscribe(res => {
            if (res.type === 'resetPassword') {
                this.resetPassword(res.username);
            } else {
                this.login(res);
            }
        });
    }

    // Open a signup dialog
    signUpDialog() {
        this.signUpDialogService.open(this.viewContainerRef, this.provider).subscribe(res => {
            this.signUp(res);
        });
    }

    // Call the auth service login method of a selected provider.
    login(user: User) {
        this.authProvider.login(user).subscribe(res => {
            this.userData = res;
        }, err => {
            const errorMessage = this.provider === 'auth0' ? err.json()['error_description'] : err['message'];
            this.openSnackBar(errorMessage);
        });
    }

    // Call the auth service resetPassword method of a selected provider.
    resetPassword(email) {
        this.authProvider.resetPassword(email).subscribe(res => {
            const message = this.provider === 'auth0' ? res._body : 'Password reset email sent.';
            this.openSnackBar(message);
        }, err => {
            this.openSnackBar(err['message']);
        });
    }

    // Call the auth service logout method of a selected provider.
    logout() {
        this.authProvider.logout().subscribe(res => {
            this.userData = {};
        });
    }

    // Call the auth service signUp method of a selected provider.
    signUp(user: User) {
        this.authProvider.signUp(user).subscribe(res => {
            this.openSnackBar('Sign Up successful');
        }, err => {
            const errorMessage = this.provider === 'auth0' ? err.json()['description'] : err['message'];
            this.openSnackBar(errorMessage);
        });
    }

    // Show the message as snakbar.
    openSnackBar(message) {
        this.snackBar.open(message, null, { duration: 5000 });
    }

}
