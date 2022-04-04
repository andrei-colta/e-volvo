import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/validators/password.validators';
import { ProfileService } from '../profile.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
// import { DynamicDialogRef } from 'primeng/api';
// import sha256 from 'crypto-js/sha256';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    environment = environment;

    @Output('closePass') closePass = new EventEmitter<any>();

    hasAlert;
    alertClass;
    alertText;

    changePasswordForm = new FormGroup({
        newPassword: new FormControl('', [Validators.required, PasswordValidators.strength, PasswordValidators.minLength]),
        confirmPassword: new FormControl('', Validators.required)
    }, PasswordValidators.checkConfirm);

    get newPassword() {
        return this.changePasswordForm.get('newPassword');
    }

    get confirmPassword() {
        return this.changePasswordForm.get('confirmPassword');
    }

    constructor(private profileService: ProfileService, private sharedService: SharedService) { }

    ngOnInit() {
    }

    changePassword() {
        if (!this.changePasswordForm.invalid) {
            // const input = {
            //     newPassword: sha256(this.newPassword.value).toString(),
            //     id: localStorage.getItem('id')
            // };

            this.profileService.changePassword(this.newPassword.value)
                .then((response) => {
                    this.hasAlert = true;
                    if (response.status === environment.PASSWORD_CHANGED) {
                        this.alertClass = environment.SUCCESS_COLOR;
                        this.alertText = environment.PASSWORD_CHANGED_MESSAGE;
                        setTimeout(() => {
                            this.closeModal();
                        }, 2000);
                    } else {
                        this.alertClass = environment.FAIL_COLOR;
                        this.alertText = environment.PASSWORD_NOT_CHANGED_MESSAGE;
                    }
                });
        }
    }

    closeModal() {
        this.closePass.emit();
    }

}
