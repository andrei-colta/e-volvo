import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { InteractionService } from '../interaction.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-live-chat',
    templateUrl: './live-chat.component.html',
    styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('scrollable') scrollable: ElementRef;

    messages = [];
    topicName;
    messageContent = '';

    scrollOnce = true;

    user_id;
    picture;

    topicData;

    connections = 0;

    constructor(private chatService: ChatService, private route: ActivatedRoute,
        private interactionService: InteractionService, private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        this.user_id = this.sharedService.id;
        this.picture = this.sharedService.picture;

        if (!this.user_id) {
            this.router.navigate(['/']);
        }

        this.topicName = this.route.snapshot.paramMap.get('topicName');

        this.getTopic();

        this.getMessages();

        this.chatService.initForTopic(this.topicName);

        this.chatService
            .getConnectionsForTopic(this.topicName)
            .subscribe((message) => {
                this.connections = message;
            });

        this.chatService
            .getMessages(this.topicName)
            .subscribe((message: string) => {
                console.log(message);
                this.messages.push(message);

                this.scrollToBottom();
                this.scrollOnce = true;
            });
    }

    ngAfterViewChecked() {
        if (this.scrollOnce) {
            this.scrollToBottom();
            this.scrollOnce = false;
        }
    }

    ngOnDestroy() {
        console.log('destroying');
        this.chatService.disconnectForTopic(this.topicName);
    }

    getTopic() {
        this.interactionService.getTopic(this.topicName).then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                this.topicData = response.data;
            }
        });
    }

    sendMessage() {
        if (this.messageContent !== '') {
            const message = {
                from: this.user_id,
                avatar: this.picture,
                content: this.messageContent
            };

            this.messageContent = '';

            this.chatService.sendMessage(this.topicName, message);
        }
    }

    scrollToBottom() {
        try {
            this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
        } catch (err) { }
    }

    getMessages() {
        this.chatService.getMessagesForTopic(this.topicName).then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                const now = new Date().getTime();
                for (const msg of response.data) {
                    const timeMsg = new Date(msg.dateSent).getTime();
                    if (now - timeMsg < environment.MS_IN_DAY) {
                        msg.sameDay = true;
                    }
                }
                this.messages = response.data;

                this.scrollToBottom();
                this.scrollOnce = true;
            }
        });
    }

}
