import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-privacy-policy-gdpr',
    templateUrl: './privacy-policy-gdpr.component.html',
    styleUrls: ['./privacy-policy-gdpr.component.css']
})
export class PrivacyPolicyGDPRComponent implements OnInit {

    terms;
    shouldAccept;
    acceptEmitter = new EventEmitter<any>();

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {

    }

    acceptTerms() {
        this.acceptEmitter.emit(true);
        this.activeModal.close();
    }

}
