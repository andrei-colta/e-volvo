import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteComponent } from './favourite/favourite.component';
import { PostComponent } from './post/post.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [NavbarComponent, FooterComponent, FavouriteComponent, PostComponent],
    exports: [NavbarComponent, FooterComponent, FavouriteComponent, PostComponent]
})
export class SharedModule { }
