import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/interaction/interaction.service';
import { SharedService } from '../shared.service';
import { AccessService } from 'src/app/access/access.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    viewingUserIsAdmin;
    viewingUserIsModerator;

    _data;
    @Input() set data(data) {
        this._data = data;
    }

    // _user;
    // @Input() set user(user) {
    //     this._user = user;
    // }

    _type;
    @Input() set type(type) {
        this._type = type;
    }

    @Input() dashboard = false;

    @Input() width = '90vw';

    _isRoot = false;
    @Input() set isRoot(isRoot) {
        this._isRoot = isRoot;
    }

    @Output() unfollow = new EventEmitter();
    @Output() remove = new EventEmitter();

    rating;
    reviewCount;

    constructor(public router: Router, private sharedService: SharedService, private accessService: AccessService) { }

    ngOnInit() {
        this.viewingUserIsAdmin = this.sharedService.isAdmin();
        this.viewingUserIsModerator = this.sharedService.isModerator();
    }

}
