import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AccessModule } from './access/access.module';
import { InteractionModule } from './interaction/interaction.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { PrivacyPolicyGDPRComponent } from './access/privacy-policy-gdpr/privacy-policy-gdpr.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AccessModule,
        HomeModule,
        InteractionModule,
        MaintenanceModule,
        ProfileModule,
        SharedModule,
        NgbModule,
        BrowserAnimationsModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
    bootstrap: [AppComponent],
    entryComponents: [PrivacyPolicyGDPRComponent]
})
export class AppModule { }
