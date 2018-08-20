import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-gh-login',
    templateUrl: './gh-login.component.html',
    styleUrls: ['./gh-login.component.scss']
})
export class GhLoginComponent implements OnInit {

    @Output() emitChange = new EventEmitter();
    @Input() data: any = 'auth0';

    resetPassword = false;

    constructor(private dialogRef: MatDialogRef<GhLoginComponent>) { }

    ngOnInit() {
    }


    onLogin(username, password) {
        this.emitChange.emit({
            username: username,
            password: password
        });
        this.closeDialog();
    }

    onReset(username) {
        this.emitChange.emit({
            type: 'resetPassword',
            username: username,
        });
        this.closeDialog();
    }

    closeDialog() {
        this.dialogRef.close();
    }

}
