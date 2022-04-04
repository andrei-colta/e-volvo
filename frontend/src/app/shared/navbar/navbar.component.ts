import { Component, OnInit } from '@angular/core';
import { AccessService } from 'src/app/access/access.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { SharedService } from '../shared.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isNavbarCollapsed = true;
    isLogged;

    id;
    firstName;
    email;
    picture;

    admin;
    moderator;

    constructor(private accessService: AccessService, private profileService: ProfileService, private sharedService: SharedService) { }

    ngOnInit() {
        this.accessService.loggedObservable.subscribe((isLogged) => {
            this.isLogged = isLogged;

            if (isLogged) {
                this.id = this.sharedService.id;
                this.firstName = this.sharedService.firstName;
                this.email = this.sharedService.email;
                this.picture = this.sharedService.picture;
                this.admin = this.sharedService.isAdmin();
                this.moderator = this.sharedService.isModerator();
            } else {
                localStorage.clear();
                this.id = this.sharedService.id;
                this.firstName = this.sharedService.firstName;
                this.email = this.sharedService.email;
                this.picture = this.sharedService.picture;
                this.admin = this.sharedService.isAdmin();
                this.moderator = this.sharedService.isModerator();
            }
        });

        this.accessService.refreshUserData(this.sharedService.id !== null);
    }

}
