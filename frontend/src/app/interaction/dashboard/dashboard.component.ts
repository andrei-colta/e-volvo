import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    profileData: any = {};

    searchCriteria = 'newThread';

    data = [];

    myPosts = [];

    constructor(private interactionService: InteractionService, private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        }

        this.getProfile();

        this.getNewPosts('newThread', true);

        this.getPosts();
    }

    getProfile() {
        this.interactionService.getProfile().then((response) => {
            console.log(response);
            if (response.status === environment.DATA_RETRIEVED) {
                this.profileData = response.data;

                if (this.profileData.birthday) {
                    this.profileData.age = this.sharedService.calcAge(this.profileData.birthday);
                }
            }
        });
    }

    getNewPosts(type, force?) {
        if (this.searchCriteria !== type || force) {
            this.interactionService.getNewPosts(type).then((response) => {
                console.log(response);
                if (response.status === environment.DATA_RETRIEVED) {
                    this.data = response.data;
                }
            });
        }
    }

    getPosts() {
        this.interactionService.getPosts().then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                this.myPosts = response.data;
            }
        });
    }

    unfollowThread(post) {
        const thread = {
            _id: post.threadId,
            favourite: 0,
            user_id: this.sharedService.id
        };

        this.interactionService.favouriteThread(thread).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getNewPosts(this.searchCriteria, true);
            }
        });
    }
}
