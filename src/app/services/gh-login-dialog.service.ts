import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { GhLoginComponent } from 'app/gh-login/gh-login.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GhLoginDialogService {
    constructor(private dialog: MdDialog) {
    }

    public open(viewContainerRef: ViewContainerRef, data?: any): Observable<any> {

        let dialogRef: MdDialogRef<GhLoginComponent>;
        const config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(GhLoginComponent, config);

        dialogRef.componentInstance.data = data;

        return dialogRef.componentInstance['emitChange'];
    }
}
