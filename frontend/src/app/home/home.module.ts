import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, FaqComponent]
})
export class HomeModule { }
