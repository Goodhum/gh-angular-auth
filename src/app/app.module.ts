import { GhAuthModule } from './../lib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { config } from './providers.config';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GhAuthModule.forRoot(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
