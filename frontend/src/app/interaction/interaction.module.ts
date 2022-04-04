import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralTopicsComponent } from './general-topics/general-topics.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadComponent } from './thread/thread.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { InteractionService } from './interaction.service';
import { SharedService } from '../shared/shared.service';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';
import { ChatService } from './chat.service';
import { MatButtonModule } from '@angular/material/button';
import { PaginatorModule } from 'primeng/paginator';
import { MaintenanceService } from '../maintenance/maintenance.service';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        CKEditorModule,
        TooltipModule,
        MatButtonModule,
        PaginatorModule
    ],
    declarations: [DashboardComponent, GeneralTopicsComponent, ThreadsComponent, ThreadComponent, LiveChatComponent, NewPostFormComponent],
    providers: [InteractionService, SharedService, ChatService, MaintenanceService]
})
export class InteractionModule { }
