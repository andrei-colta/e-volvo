import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../maintenance.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

    users = [];

    constructor(private maintenanceService: MaintenanceService, private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        }

        this.getUsers();
    }

    getUsers() {
        this.maintenanceService.getUsers().then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                this.users = response.data;
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    setModerator(user) {
        const value = (user.moderator ? user.moderator : false);
        this.maintenanceService.setModerator(user._id, !value).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getUsers();
            }
        });
    }

    banUser(user) {
        const value = (user.banned ? user.banned : false);
        this.maintenanceService.banUser(user._id, !value).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getUsers();
            }
        });
    }
}
