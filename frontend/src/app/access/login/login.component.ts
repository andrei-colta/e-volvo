import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccessService } from '../access.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    environment = environment;

    hasAlert = false;
    alertText;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    });

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    constructor(private accessService: AccessService, private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        if (this.sharedService.id) {
            this.router.navigate(['']);
        }
    }

    login() {
        if (!this.loginForm.valid) {
            this.hasAlert = true;
            this.alertText = environment.LOGIN_FIELDS_EMPTY_MESSAGE;
            return;
        }

        this.accessService.login(this.email.value, this.password.value)
            .then((response) => {
                console.log(response);
                if (response.status === environment.LOGIN_SUCCESSFUL) {
                    if (response.data.firstLogin) {
                        this.accessService.showTermsModal(true);
                    } else {
                        this.accessService.initLogin();
                        this.router.navigate(['/']);
                    }
                } else {
                    this.hasAlert = true;
                    this.alertText = environment.LOGIN_FAILED_MESSAGE;
                }
            });
    }

    logout() {
        this.accessService.logout();
    }

}
