import { GhAuthModule } from './../lib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { config } from './providers.config';
import { GhLoginComponent } from './gh-login/gh-login.component';
import {
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule,
    MatSnackBarModule
} from '@angular/material';
import { GhLoginDialogService } from './services/gh-login-dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhSignUpComponent } from './gh-sign-up/gh-sign-up.component';
import { GhSignUpDialogService } from './services/gh-sign-up-dialog.service';

@NgModule({
    declarations: [
        AppComponent,
        GhLoginComponent,
        GhSignUpComponent
    ],
    imports: [
        FormsModule,
        MatIconModule,
        BrowserModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        GhAuthModule.forRoot(config)
    ],
    entryComponents: [
        GhLoginComponent,
        GhSignUpComponent
    ],
    providers: [
        GhLoginDialogService,
        GhSignUpDialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
