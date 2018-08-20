import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-gh-sign-up',
    templateUrl: './gh-sign-up.component.html',
    styleUrls: ['./gh-sign-up.component.scss']
})
export class GhSignUpComponent implements OnInit {
    @Output() emitChange = new EventEmitter();
    @Input() data: any = 'auth0';

    registerForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<GhSignUpComponent>,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
            confirmPassword: ['']
        });
    }

    signUp(val) {
        this.emitChange.emit(val);
        this.closeDialog();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
