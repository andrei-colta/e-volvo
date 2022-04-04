import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyGDPRComponent } from './privacy-policy-gdpr/privacy-policy-gdpr.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccessService } from './access.service';
import { SharedService } from '../shared/shared.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [LoginComponent, SignupComponent, TermsAndConditionsComponent, PrivacyPolicyGDPRComponent, ForgotPasswordComponent],
    providers: [AccessService, SharedService]
})
export class AccessModule { }
