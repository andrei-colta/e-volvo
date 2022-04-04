import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorMenuComponent } from './moderator-menu/moderator-menu.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { MaintenanceService } from './maintenance.service';
import { SharedService } from '../shared/shared.service';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        TableModule
    ],
    declarations: [ModeratorMenuComponent, AdminMenuComponent],
    providers: [SharedService, MaintenanceService]
})
export class MaintenanceModule { }
