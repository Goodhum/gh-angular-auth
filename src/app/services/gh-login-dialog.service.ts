import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { GhLoginComponent } from '../gh-login/gh-login.component';
import { Observable } from 'rxjs';

@Injectable()
export class GhLoginDialogService {
    constructor(private dialog: MatDialog) {
    }

    public open(viewContainerRef: ViewContainerRef, data?: any): Observable<any> {

        let dialogRef: MatDialogRef<GhLoginComponent>;
        const config = new MatDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(GhLoginComponent, config);

        dialogRef.componentInstance.data = data;

        return dialogRef.componentInstance['emitChange'];
    }
}
