import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from '../interaction.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MaintenanceService } from 'src/app/maintenance/maintenance.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';
import { AccessService } from 'src/app/access/access.service';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
    environment = environment;

    @ViewChild('scrollable') scrollable: ElementRef;
    public Editor = ClassicEditor;

    threadId;
    threadData;

    posts;
    showNewPostForm = false;

    paginatedPosts;

    newPostForm = new FormGroup({
        description: new FormControl
    });

    postsPerPage = 5;

    get description() {
        return this.newPostForm.get('description');
    }

    constructor(private route: ActivatedRoute, private interactionService: InteractionService, private router: Router,
        private maintenanceService: MaintenanceService, private sharedService: SharedService, private accessService: AccessService) { }

    ngOnInit() {
        this.threadId = this.route.snapshot.paramMap.get('threadId');

        this.getThread();
    }

    addResponse() {
        const body = {
            user_id: this.sharedService.id,
            thread_id: this.threadId,
            creationDate: new Date(),
            description: this.description.value,
            title: 'Re: ' + this.threadData.rootPost.title,
            nested: true
        };

        this.interactionService.addPost(body).then((response) => {
            if (response.status === environment.DATA_INSERTED) {
                this.showNewPostForm = false;
                this.description.setValue('');

                this.getThread();
            }
        });
    }

    getThread() {
        this.interactionService.getThread(this.threadId, true).then((response1) => {
            if (response1.status === environment.DATA_RETRIEVED) {
                this.threadData = response1.data;

                this.posts = response1.posts;
                this.paginatedPosts = this.posts.slice(0, this.postsPerPage);

                this.interactionService.getNewPosts('newPost').then((response2) => {
                    if (response2.status === environment.DATA_RETRIEVED) {
                        if (response2.data.length > 0) {
                            this.interactionService.viewNewPosts(this.threadData._id, this.sharedService.id);
                        }
                    }
                });
            }
        });
    }

    replyToPost() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        } else {
            this.showNewPostForm = true;
        }
    }

    paginate(event) {
        this.paginatedPosts = this.posts.slice(event.first, event.first + this.postsPerPage);
        this.scrollToTop();
    }

    public onChange({ editor }: ChangeEvent) {
        const data = editor.getData();

        this.description.setValue(data);
    }

    scrollToTop() {
        try {
            this.scrollable.nativeElement.scrollTop = 0;
        } catch (err) { }
    }

    removePost(post) {
        this.maintenanceService.removePost(post._id).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getThread();
            }
        });
    }
}
