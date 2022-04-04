import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {

    adminRootURL = environment.rootURL + 'admin/';
    moderatorRootURL = environment.rootURL + 'moderator/';

    getUsersURL = this.moderatorRootURL + 'getUsers';
    banUserURL = this.moderatorRootURL + 'banUser';
    removePostURL = this.moderatorRootURL + 'removePost';
    removeThreadURL = this.moderatorRootURL + 'removeThread';

    setModeratorURL = this.adminRootURL + 'setModerator';

    constructor(private sharedService: SharedService) { }

    getUsers() {
        return this.sharedService.get(this.getUsersURL);
    }

    banUser(targetUserId, value) {
        const body = {
            targetUserId: targetUserId,
            value: value
        };

        return this.sharedService.post(this.banUserURL, body);
    }

    removePost(postId) {
        return this.sharedService.delete(this.removePostURL, { params: { postId: postId } });
    }

    removeThread(threadId) {
        return this.sharedService.delete(this.removeThreadURL, { params: { threadId: threadId } });
    }

    setModerator(targetUserId, value) {
        const body = {
            targetUserId: targetUserId,
            value: value
        };

        return this.sharedService.post(this.setModeratorURL, body);
    }
}
