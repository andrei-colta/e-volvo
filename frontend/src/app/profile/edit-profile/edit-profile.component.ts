import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Subject, concat, of } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { AccessService } from 'src/app/access/access.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
    environment = environment;

    today = new Date();
    yearrange: string;

    public Editor = ClassicEditor;

    // picture stuff
    selectedFile = null; // poza
    fd = new FormData();
    uploadPic = true;
    picAlert;
    myPicture;
    oldPicture;
    firstPicChange = true;
    picURL;

    // fields for image cropper
    imageChangedEvent: any = '';
    croppedImage: any = '';
    CropTitleVisible: any;
    cropperReady = false;
    croppedfile;

    selectedPage = 0;

    bio = environment.EDITOR_PLACEHOLDER_BIO;
    sex = 'M';
    birthday;
    editProfileForm: FormGroup;
    countries = [];
    cities = [];

    countriesLoading = false;
    countriesInput$ = new Subject<string>();

    selectedCountry;

    hasAlert = false;
    alertText;
    alertType;

    emailDisabled = true;

    changePasswordShow;

    visibility;

    get email() {
        return this.editProfileForm.get('email');
    }

    get firstName() {
        return this.editProfileForm.get('firstName');
    }

    get lastName() {
        return this.editProfileForm.get('lastName');
    }

    get phone() {
        return this.editProfileForm.get('phone');
    }

    get phoneCode() {
        return this.editProfileForm.get('phoneCode');
    }

    get address() {
        return this.editProfileForm.get('address');
    }

    get city() {
        return this.editProfileForm.get('city');
    }

    get country() {
        return this.editProfileForm.get('country');
    }

    @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
    @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private sharedService: SharedService, private accessService: AccessService, private router: Router) {
        this.editProfileForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZȚțșȘÎîĂăÂâ.,:;()@!?_ \-]*')]),
            lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZȚțșȘÎîĂăÂâ.,:;()@!?_ \-]*')]),
            phone: new FormControl('', Validators.required),
            phoneCode: new FormControl(),
            address: new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-ZȚțșȘÎîĂăÂâ\'.,:;()@!?_/ \"\n\-]*')]),
            country: new FormControl(),
            city: new FormControl()
        });
    }

    ngOnInit() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        }

        this.city.disable();
        this.phoneCode.disable();

        let tabNumber: any = this.route.snapshot.paramMap.get('tabNumber');

        if (tabNumber) {
            tabNumber = parseInt(tabNumber, 10);
            this.selectedPage = tabNumber;
        } else {
            tabNumber = 0;
        }

        const year = this.today.getFullYear();

        this.yearrange = year - 110 + ':' + year;

        this.getProfile();
    }

    loadCountries() {
        if (this.countries.length === 0) {
            this.profileService.getCountries().then((response) => {
                if (response.status === environment.DATA_RETRIEVED) {
                    this.countries = response.data;
                }
            });
        }
    }

    loadCities() {
        if (this.cities.length === 0) {
            this.profileService.getCities(this.country.value.code).then((response) => {
                if (response.status === environment.DATA_RETRIEVED) {
                    this.cities = response.data;
                }
            });
        }
    }

    selectCountry(country) {
        if (country) {
            if (this.selectedCountry && this.selectedCountry.code !== country.code) {
                this.city.setValue(undefined);
                this.cities = [];
                this.city.enable();
            }
        } else {
            this.city.setValue(undefined);
            this.city.disable();
        }

        this.selectedCountry = country;
    }

    public onChange( { editor }: ChangeEvent ) {
        const data = editor.getData();

        this.bio = data;
    }

    getProfile() {
        this.profileService.getOwnProfile().then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                if (response.data.visibility) {
                    this.visibility = response.data.visibility;
                }

                this.email.setValue(response.data.email);
                this.firstName.setValue(response.data.firstName);
                this.lastName.setValue(response.data.lastName);
                this.phone.setValue(response.data.phone);
                this.phoneCode.setValue(response.data.phoneCode);
                this.address.setValue(response.data.address);

                if (response.data.bio) {
                    this.bio = response.data.bio;
                }

                this.sex = response.data.sex;
                this.myPicture = response.data.picture;
                this.birthday = new Date(response.data.birthday);

                this.country.setValue(response.data.country);
                this.city.setValue(response.data.city);

                this.selectedCountry = response.data.country;

                this.accessService.refreshUserData(true);

                if (this.country.value) {
                    this.city.enable();
                }
            }
        });
    }

    setAlert(text, type) {
        this.hasAlert = true;

        this.alertText = text;
        this.alertType = type;

        setTimeout(() => {
            this.hasAlert = false;
        }, this.profileService.alertTimeout);
    }

    updateProfileData() {
        if (!this.editProfileForm.valid) {
            this.setAlert(environment.FIELDS_NOT_VALID, environment.FAIL_COLOR);
            return;
        }

        const body = {
            user_id: this.sharedService.id,
            email: this.email.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            phone: this.phone.value,
            phoneCode: this.phoneCode.value,
            address: this.address.value,
            bio: (this.bio !== environment.EDITOR_PLACEHOLDER_BIO ? this.bio : ''),
            sex: this.sex,
            birthday: this.sharedService.formatDate(this.birthday),
            picture: this.myPicture,
            country: this.country.value,
            city: this.city.value
        };

        this.profileService.updateProfileData(body).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.setAlert(environment.DATA_UPDATED_MESSAGE, environment.SUCCESS_COLOR);

                this.getProfile();
            } else {
                this.setAlert(environment.DATA_NOT_UPDATED_MESSAGE, environment.FAIL_COLOR);
            }
        });
    }

    upload() {
        if (this.selectedFile) {
            const file = this.selectedFile.target.files[0];

            const url = this.profileService.uploadPictureURL;

            const formData: FormData = new FormData();
            formData.append('picture', file, file.name);

            const req = new HttpRequest('POST', url, formData);

            this.sharedService.request(req).then((response: any) => {
                this.getProfile();
            });
        }
    }

    createFormData(file) {
        this.selectedFile = file;
        this.imageChangedEvent = true;

        this.upload();
    }

    cancelEditPicture() {
        this.selectedFile = false;
        this.imageChangedEvent = false;
    }

    selectPage(number) {
        this.selectedPage = number;
        this.router.navigate(['/edit-profile/' + number]);
    }

    toggleEmail() {
        if (this.emailDisabled) {
            this.emailDisabled = false;
            this.editProfileForm.controls['email'].enable();
        } else {
            if (!this.email.valid) {
                this.setAlert(environment.EMAIL_NOT_VALID, environment.FAIL_COLOR);
                return;
            }

            this.profileService.changeEmail(this.editProfileForm.controls['email'].value).then((response) => {
                if (response.status === environment.DATA_UPDATED) {
                    this.setAlert(environment.DATA_UPDATED_MESSAGE, environment.SUCCESS_COLOR);
                    this.editProfileForm.controls['email'].disable();
                    this.emailDisabled = true;
                } else {
                    this.setAlert(environment.DATA_NOT_UPDATED_MESSAGE, environment.FAIL_COLOR);
                }
            });
        }
    }

    updateVisibility() {
        this.profileService.updateVisibility(this.visibility)
            .then((response) => {
                if (response.status === environment.DATA_UPDATED) {
                    this.setAlert(environment.VISIBILITY_UPDATED, environment.SUCCESS_COLOR);
                } else {
                    this.setAlert(environment.VISIBILITY_NOT_UPDATED, environment.FAIL_COLOR);
                }
            });
    }

    openChangePassword() {
        this.changePasswordShow = true;
    }

    closeChangePassword() {
        this.changePasswordShow = false;
    }
}
