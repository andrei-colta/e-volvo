import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        const user_id = this.sharedService.id;

        if (!user_id) {
            this.router.navigate(['/login']);
        } else {
            const isAdmin = this.sharedService.isAdmin();

            if (isAdmin) {
                this.router.navigate(['/admin-menu']);
            } else {
                this.router.navigate(['/dashboard']);
            }
        }

    }
}
