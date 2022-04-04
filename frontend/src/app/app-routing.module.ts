import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home/home.component';
import { SignupComponent } from './access/signup/signup.component';
import { LoginComponent } from './access/login/login.component';
import { FaqComponent } from './home/faq/faq.component';
import { DashboardComponent } from './interaction/dashboard/dashboard.component';
import { GeneralTopicsComponent } from './interaction/general-topics/general-topics.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ThreadsComponent } from './interaction/threads/threads.component';
import { LiveChatComponent } from './interaction/live-chat/live-chat.component';
import { ThreadComponent } from './interaction/thread/thread.component';
import { AdminMenuComponent } from './maintenance/admin-menu/admin-menu.component';
import { ModeratorMenuComponent } from './maintenance/moderator-menu/moderator-menu.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'login', component: LoginComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'general', component: GeneralTopicsComponent },
            { path: 'threads/:forumURL', component: ThreadsComponent },
            { path: 'edit-profile/:tabNumber', component: EditProfileComponent },
            { path: 'chat/:topicName', component: LiveChatComponent },
            { path: 'thread/:threadId', component: ThreadComponent },
            { path: 'admin-menu', component: AdminMenuComponent },
            { path: 'moderator-menu', component: ModeratorMenuComponent },
            { path: 'view-profile/:profileId', component: DisplayProfileComponent },
        ], { onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
