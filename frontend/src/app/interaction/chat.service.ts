import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket;
    interactionRootURL = environment.rootURL + 'interaction/';
    getMessagesForTopicURL = this.interactionRootURL + 'getMessages';

    constructor(private sharedService: SharedService) {
        this.socket = io(environment.chatRootURL);
    }

    initForTopic(topic) {
        this.socket.emit('connectTopic', { user_id: this.sharedService.id, topic: topic });
    }

    disconnectForTopic(topic) {
        this.socket.emit('disconnectTopic', { user_id: this.sharedService.id, topic: topic });
    }

    sendMessage(type, message) {
        this.socket.emit(type, message);
    }

    public getConnectionsForTopic(topic) {
        return Observable.create((observer) => {
            this.socket.on(topic + '-connections', (message) => {
                observer.next(message);
            });
        });
    }

    public getMessages = (type) => {
        return Observable.create((observer) => {
            this.socket.on(type, (message) => {
                observer.next(message);
            });
        });
    }

    getMessagesForTopic(topic) {
        return this.sharedService.get(this.getMessagesForTopicURL, { params: { topic: topic } });
    }
}
