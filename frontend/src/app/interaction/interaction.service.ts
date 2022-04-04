import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InteractionService {
    interactionRootURL = environment.rootURL + 'interaction/';

    getAllTopicsURL = this.interactionRootURL + 'getAllTopics';
    getTopicURL = this.interactionRootURL + 'getTopic';
    favouriteTopicURL = this.interactionRootURL + 'favouriteTopic';
    favouriteThreadURL = this.interactionRootURL + 'favouriteThread';
    getFavouritedTopicsURL = this.interactionRootURL + 'getFavouritedTopics';
    getFavouritedThreadsURL = this.interactionRootURL + 'getFavouritedThreads';
    addThreadURL = this.interactionRootURL + 'addThread';
    getThreadURL = this.interactionRootURL + 'getThread';
    getThreadsForTopicURL = this.interactionRootURL + 'getThreadsForTopic';
    addPostURL = this.interactionRootURL + 'addPost';
    getNewPostsURL = this.interactionRootURL + 'getNewPosts';
    viewNewThreadsURL = this.interactionRootURL + 'viewNewThreads';
    viewNewPostsURL = this.interactionRootURL + 'viewNewPosts';
    getPostsURL = this.interactionRootURL + 'getPostsForUser';

    getProfileURL = environment.rootURL + 'profile/getOwnProfile';
    getPictureURL = environment.rootURL + 'profile/getPicture';

    constructor(private sharedService: SharedService) { }

    getAllTopics() {
        return this.sharedService.get(this.getAllTopicsURL);
    }

    getTopic(topic) {
        return this.sharedService.get(this.getTopicURL, { params: { topic: topic } });
    }

    favouriteTopic(forumData) {
        const body = {
            topic: forumData.url,
            value: forumData.favourite,
            topicId: forumData._id
        };

        return this.sharedService.post(this.favouriteTopicURL, body);
    }

    getProfile() {
        return this.sharedService.get(this.getProfileURL);
    }

    addThread(thread) {
        return this.sharedService.post(this.addThreadURL, thread);
    }

    getThread(thread_id, getPosts?) {
        return this.sharedService.get(this.getThreadURL, { params: { thread_id: thread_id, getPosts: getPosts } });
    }

    getThreadsForTopic(topic_id) {
        return this.sharedService.get(this.getThreadsForTopicURL, { params: { topic_id: topic_id } });
    }

    getFavouritedTopics() {
        return this.sharedService.get(this.getFavouritedTopicsURL);
    }

    getFavouritedThreads() {
        return this.sharedService.get(this.getFavouritedThreadsURL);
    }

    addPost(body) {
        return this.sharedService.post(this.addPostURL, body);
    }

    getNewPosts(type) {
        return this.sharedService.get(this.getNewPostsURL, { params: { type: type } });
    }

    viewNewThreads(topicId, user_id) {
        this.sharedService.post(this.viewNewThreadsURL, { topicId: topicId, user_id: user_id });
    }

    viewNewPosts(threadId, user_id) {
        this.sharedService.post(this.viewNewPostsURL, { threadId: threadId, user_id: user_id });
    }

    favouriteThread(thread) {
        const body = {
            threadId: thread._id,
            value: thread.favourite,
            user_id: thread.user_id
        };

        return this.sharedService.post(this.favouriteThreadURL, body);
    }

    getPosts() {
        return this.sharedService.get(this.getPostsURL);
    }
}
