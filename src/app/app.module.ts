import { GhAuthModule } from './../lib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { config } from './providers.config';
import { GhLoginComponent } from './gh-login/gh-login.component';
import {
    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule,
    MdSnackBarModule
} from '@angular/material';
import { GhLoginDialogService } from 'app/services/gh-login-dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhSignUpComponent } from './gh-sign-up/gh-sign-up.component';
import { GhSignUpDialogService } from 'app/services/gh-sign-up-dialog.service';

@NgModule({
    declarations: [
        AppComponent,
        GhLoginComponent,
        GhSignUpComponent
    ],
    imports: [
        FormsModule,
        MdIconModule,
        BrowserModule,
        MdInputModule,
        MdDialogModule,
        MdButtonModule,
        FlexLayoutModule,
        MdSnackBarModule,
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
