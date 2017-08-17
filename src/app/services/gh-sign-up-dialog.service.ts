import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { GhSignUpComponent } from 'app/gh-sign-up/gh-sign-up.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GhSignUpDialogService {
    constructor(private dialog: MdDialog) {
    }

    public open(viewContainerRef: ViewContainerRef, data?: any): Observable<any> {

        let dialogRef: MdDialogRef<GhSignUpComponent>;
        const config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(GhSignUpComponent, config);
        dialogRef.componentInstance.data = data;

        return dialogRef.componentInstance['emitChange'];
    }
}
