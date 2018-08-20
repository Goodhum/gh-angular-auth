import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { GhSignUpComponent } from '../gh-sign-up/gh-sign-up.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GhSignUpDialogService {
    constructor(private dialog: MatDialog) {
    }

    public open(viewContainerRef: ViewContainerRef, data?: any): Observable<any> {

        let dialogRef: MatDialogRef<GhSignUpComponent>;
        const config = new MatDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(GhSignUpComponent, config);
        dialogRef.componentInstance.data = data;

        return dialogRef.componentInstance['emitChange'];
    }
}
