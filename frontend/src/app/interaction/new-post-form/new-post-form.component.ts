import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-new-post-form',
    templateUrl: './new-post-form.component.html',
    styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent implements OnInit {

    public Editor = ClassicEditor;

    constructor() { }

    ngOnInit() {
    }

}
