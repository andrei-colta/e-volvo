import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../access.service';
import { PasswordValidators } from 'src/app/validators/password.validators';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    environment = environment;

    hasAlert = false;
    alertText;

    signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, PasswordValidators.strength, PasswordValidators.minLength])
    });

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }

    constructor(private accessService: AccessService, private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        if (this.sharedService.id) {
            this.router.navigate(['']);
        }
    }

    signup() {
        if (!this.signupForm.valid) {
            this.hasAlert = true;
            this.alertText = environment.LOGIN_FIELDS_EMPTY_MESSAGE;
            return;
        }

        if (this.email.value && this.password.value) {
            this.accessService.signup(this.email.value, this.password.value)
                .then((response) => {
                    console.log(response);
                    if (response.status === environment.DATA_INSERTED) {
                        this.router.navigate(['/login']);
                    }
                });
        }
    }

}
