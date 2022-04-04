import { Component, OnInit } from '@angular/core';
import { AccessService } from './access/access.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'eVolvo';
    showFooter = true;

    constructor(private accessService: AccessService, private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if (val.url.split('/')[1] === 'chat') {
                    this.showFooter = false;
                } else {
                    this.showFooter = true;
                }
            }
        });
    }
}
