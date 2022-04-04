import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from '../interaction.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { MaintenanceService } from 'src/app/maintenance/maintenance.service';
import { environment } from 'src/environments/environment';
import { AccessService } from 'src/app/access/access.service';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.component.html',
    styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
    environment = environment;

    forumURL;
    forumData;

    viewerIsAdmin;
    viewerIsModerator;

    showNewThreadForm = false;

    newThreadForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    });

    public Editor = ClassicEditor;

    threads = [];

    get title() {
        return this.newThreadForm.get('title');
    }

    get description() {
        return this.newThreadForm.get('description');
    }

    constructor(private route: ActivatedRoute, private router: Router, private interactionService: InteractionService,
        private sharedService: SharedService, private maintenanceService: MaintenanceService, private accessService: AccessService) { }

    ngOnInit() {
        this.forumURL = this.route.snapshot.paramMap.get('forumURL');

        if (!this.forumURL) {
            this.router.navigate(['/general']);
        } else {
            this.getTopic();
        }

        this.viewerIsAdmin = this.sharedService.isAdmin();
        this.viewerIsModerator = this.sharedService.isModerator();
    }

    getTopic() {
        this.interactionService.getTopic(this.forumURL).then((response1) => {
            if (response1.status === environment.DATA_RETRIEVED) {
                if (response1.favourite) {
                    response1.data.favourite = response1.favourite.value;
                }

                this.forumData = response1.data;

                this.getThreads();

                this.interactionService.getNewPosts('newThread').then((response2) => {
                    if (response2.status === environment.DATA_RETRIEVED) {
                        if (response2.data.length > 0) {
                            this.interactionService.viewNewThreads(this.forumData._id, this.sharedService.id);
                        }
                    }
                });
            }
        });
    }

    removeThread(thread) {
        this.maintenanceService.removeThread(thread._id).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getThreads();
            }
        });
    }

    toggleNewThreadForm() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        } else {
            this.showNewThreadForm = !this.showNewThreadForm;
        }
    }

    toggleFavourite() {
        const initialValue = this.forumData.favourite;
        if (this.forumData.favourite === 1) {
            this.forumData.favourite = 0;
        } else {
            this.forumData.favourite = 1;
        }

        this.interactionService.favouriteTopic(this.forumData).then((response) => {
            if (response.status !== environment.DATA_UPDATED) {
                this.forumData.favourite = initialValue;
            }
        });
    }

    toggleFavouriteThread(thread) {
        const initialValue = thread.favourite;
        if (thread.favourite === 1) {
            thread.favourite = 0;
        } else {
            thread.favourite = 1;
        }

        this.interactionService.favouriteThread(thread).then((response) => {
            if (response.status !== environment.DATA_UPDATED) {
                thread.favourite = initialValue;
            }
        });
    }

    public onChange( { editor }: ChangeEvent ) {
        const data = editor.getData();

        this.description.setValue(data);
    }

    formatThreads(rawThreads) {
        const threads = [];
        for (const t of rawThreads) {
            threads.push({
                _id: t._id,
                title: t.rootPost.title,
                author: {
                    name: t.user_id.firstName + ' ' + t.user_id.lastName,
                    picture: t.user_id.picture
                },
                user_id: t.user_id._id,
                creationDate: this.sharedService.formatDate(new Date(t.creationDate))
            });
        }
        this.threads = threads;
    }

    getThreads() {
        this.interactionService.getThreadsForTopic(this.forumData._id).then((response1) => {
            if (response1.status === environment.DATA_RETRIEVED) {
                this.interactionService.getFavouritedThreads().then((response2) => {
                    if (response2.status === environment.DATA_RETRIEVED) {
                        const threads = [];

                        for (const t of response1.data) {
                            const newThread: any = {
                                _id: t._id,
                                title: (t.rootPost ? t.rootPost.title : ''),
                                author: {
                                    name: t.user_id.firstName + ' ' + t.user_id.lastName,
                                    picture: t.user_id.picture
                                },
                                creationDate: this.sharedService.formatDate(new Date(t.creationDate))
                            };

                            for (const f of response2.data) {
                                if (newThread._id === f.threadId) {
                                    newThread.favourite = f.value;
                                    break;
                                }
                            }

                            threads.push(newThread);
                        }
                        this.threads = threads;
                    } else {
                        this.formatThreads(response1.data);
                    }
                });
            }
        });
    }

    addThread() {
        const body = {
            topic_id: this.forumData._id,
            title: this.title.value,
            description: this.description.value
        };

        this.interactionService.addThread(body).then((response) => {
            console.log(response);
            if (response.status === environment.DATA_INSERTED) {
                this.getThreads();
                this.showNewThreadForm = false;
            }
        });
    }
}
