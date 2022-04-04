import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { DisplayProfileComponent } from './display-profile/display-profile.component';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgSelectModule } from '@ng-select/ng-select';
import {
    MatProgressBarModule, MatListModule, MatDialogModule, MatButtonModule, MatTabsModule, MatInputModule,
    MatChipsModule, MatIconModule, MatSliderModule
} from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { NgxLoadingModule } from 'ngx-loading';
import { ProfileService } from './profile.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        ReactiveFormsModule,
        ImageCropperModule,
        CalendarModule,
        NgbModule,
        FormsModule,
        RadioButtonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        Ng5SliderModule,
        FileUploadModule,
        MatButtonModule,
        CKEditorModule,
        MatProgressBarModule,
        MatListModule,
        MatDialogModule,
        CarouselModule,
        DropdownModule,
        BrowserAnimationsModule,
        DynamicDialogModule,
        InputTextModule,
        MatInputModule,
        ToastModule,
        NgSelectModule,
        MatSliderModule,
        NgxLoadingModule,
        MatChipsModule,
        MatIconModule
    ],
    declarations: [EditProfileComponent, ProfileSettingsComponent, DisplayProfileComponent, ChangePasswordComponent, MyCarsComponent],
    providers: [ProfileService]
})
export class ProfileModule { }
