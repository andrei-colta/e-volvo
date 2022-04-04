import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { environment } from 'src/environments/environment';
import sha256 from 'crypto-js/sha256';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyGDPRComponent } from './privacy-policy-gdpr/privacy-policy-gdpr.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    accessRootURL = environment.rootURL + 'access/';
    signupURL = this.accessRootURL + 'signup';
    loginURL = this.accessRootURL + 'login';

    loginResponse;

    loggedObservable = new Subject<boolean>();
    isLogged = false;

    constructor(private sharedService: SharedService, private modalService: NgbModal, private router: Router) { }

    initLogin() {
        for (const k of Object.keys(this.loginResponse)) {
            localStorage.setItem(k, this.loginResponse[k]);
        }

        this.refreshUserData(true);
    }

    login(email, password) {
        const input = {
            email: email,
            password: sha256(password).toString()
        };

        return new Promise<any>((resolve) => {
            this.sharedService.post(this.loginURL, input).then((response) => {
                if (response.status === environment.LOGIN_SUCCESSFUL) {
                    this.loginResponse = response.data;
                    this.loginResponse.email = email;
                } else {
                    this.refreshUserData(false);
                }
                resolve(response);
            });
        });
    }

    signup(email, password) {
        const input = {
            email: email,
            password: sha256(password).toString()
        };

        return this.sharedService.post(this.signupURL, input);
    }

    logout() {
        localStorage.clear();
        this.refreshUserData(false);
    }

    refreshUserData(isLogged) {
        this.isLogged = isLogged;
        this.loggedObservable.next(isLogged);
    }

    showTermsModal(shouldAccept) {
        const modalRefTerms = this.modalService.open(PrivacyPolicyGDPRComponent);
        modalRefTerms.componentInstance.terms = { text: environment.TERMS_AND_CONDITIONS };
        modalRefTerms.componentInstance.shouldAccept = shouldAccept;

        if (shouldAccept) {
            modalRefTerms.componentInstance.acceptEmitter.subscribe((answer) => {
                if (answer === true) {
                    this.initLogin();
                    this.router.navigate(['/']);
                }
            });
        }
    }
}
