import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

    classArray = ['far fa-star', 'fas fa-star'];

    __favourite = 0;
    @Input() set favourite(favourite) {
        if (favourite !== undefined) {
            this.__favourite = favourite;
        }
    }

    __style;
    @Input() set style(style) {
        this.__style = style;
    }

    constructor() { }

    ngOnInit() {
    }

}
