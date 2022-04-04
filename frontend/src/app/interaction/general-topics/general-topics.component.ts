import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction.service';
import { environment } from 'src/environments/environment';
import { AccessService } from 'src/app/access/access.service';

@Component({
    selector: 'app-general-topics',
    templateUrl: './general-topics.component.html',
    styleUrls: ['./general-topics.component.css']
})
export class GeneralTopicsComponent implements OnInit {

    forums = [];

    constructor(private router: Router, private interactionService: InteractionService, private accessService: AccessService) { }

    ngOnInit() {
        this.getTopics();
    }

    getTopics() {
        this.interactionService.getAllTopics().then((response1) => {
            if (response1.status === environment.DATA_RETRIEVED) {
                const forums = response1.data;
                this.interactionService.getFavouritedTopics().then((response2) => {
                    if (response2.status === environment.DATA_RETRIEVED) {
                        for (const f of forums) {
                            f.favourite = 0;

                            for (const fav of response2.data) {
                                if (f.url === fav.topicUrl) {
                                    f.favourite = fav.value;
                                    break;
                                }
                            }
                        }
                    }
                    this.forums = forums;
                });
            }
        });
    }

    toggleFavourite(forumData) {
        const initialValue = forumData.favourite;
        if (forumData.favourite === 1) {
            forumData.favourite = 0;
        } else {
            forumData.favourite = 1;
        }

        this.interactionService.favouriteTopic(forumData).then((response) => {
            if (response.status !== environment.DATA_UPDATED) {
                forumData.favourite = initialValue;
            }
        });
    }
}
