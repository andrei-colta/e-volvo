import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-my-cars',
    templateUrl: './my-cars.component.html',
    styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent implements OnInit {
    environment = environment;

    hasAlert = false;
    alertText;
    alertType;

    newCarForm;

    carList = [];

    imageChangedEvent;
    selectedFile;

    selectedCar;

    get brand() {
        return this.newCarForm.get('brand');
    }

    get model() {
        return this.newCarForm.get('model');
    }

    get year() {
        return this.newCarForm.get('year');
    }

    get engine() {
        return this.newCarForm.get('engine');
    }

    constructor(private sharedService: SharedService, private profileService: ProfileService) {
        this.newCarForm = new FormGroup({
            brand: new FormControl('', [Validators.required]),
            model: new FormControl('', [Validators.required]),
            year: new FormControl('', [Validators.required, Validators.pattern('[0-9 /-]*')]),
            engine: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.getCars();
    }

    getCars() {
        this.profileService.getCars().then((response) => {
            console.log(response);
            if (response.status === environment.DATA_RETRIEVED) {
                this.carList = response.data;
            }
        });
    }

    addCar() {
        if (!this.newCarForm.valid) {
            this.setAlert(environment.FIELDS_NOT_VALID, environment.FAIL_COLOR);
            return;
        }

        const body = {
            _id: (this.selectedCar ? this.selectedCar._id : undefined),
            brand: this.brand.value,
            model: this.model.value,
            year: this.year.value,
            engine: this.engine.value
        };

        this.profileService.addCar(body).then((response) => {
            console.log(response);
            if (response.status === environment.DATA_UPDATED) {
                if (!this.selectedCar) {
                    this.clearForm();
                }
                this.getCars();
                this.setAlert(environment.DATA_UPDATED_MESSAGE, environment.SUCCESS_COLOR);
            } else {
                this.setAlert(environment.DATA_NOT_UPDATED_MESSAGE, environment.FAIL_COLOR);
            }
        });
    }

    createFormData(file) {
        this.selectedFile = file;
        this.imageChangedEvent = true;

        this.upload();
    }

    fillForm(car) {
        this.brand.setValue(car.brand);
        this.model.setValue(car.model);
        this.year.setValue(car.year);
        this.engine.setValue(car.engine);
    }

    clearForm() {
        this.brand.setValue('');
        this.model.setValue('');
        this.year.setValue('');
        this.engine.setValue('');
        this.newCarForm.markAsUntouched();
    }

    setAlert(text, type) {
        this.hasAlert = true;

        this.alertText = text;
        this.alertType = type;

        setTimeout(() => {
            this.hasAlert = false;
        }, this.profileService.alertTimeout);
    }

    selectCar(index) {
        if (!this.selectedCar || this.selectedCar._id !== this.carList[index]._id) {
            const newSelectedCar = this.carList[index];

            this.fillForm(newSelectedCar);

            this.profileService.getCarPictures(this.carList[index]._id).then((response) => {
                if (response.status === environment.DATA_RETRIEVED) {
                    newSelectedCar.pictures = response.data;
                }

                this.selectedCar = newSelectedCar;

                console.log(this.selectedCar);
            });
        } else {
            this.selectedCar = undefined;
            this.clearForm();
        }
    }

    upload() {
        if (this.selectedFile) {
            const url = this.profileService.uploadCarPictureURL;
            for (const file of this.selectedFile.target.files) {

                const formData: FormData = new FormData();
                formData.append('picture', file, file.name);

                const params = new HttpParams().append('carId', this.selectedCar._id);

                const req = new HttpRequest('POST', url, formData, { params: params });

                this.sharedService.request(req).then((response: any) => {
                    console.log(response);
                    this.getCarPics();
                });
            }
        }
    }

    getCarPics() {
        if (this.selectedCar) {
            return this.profileService.getCarPictures(this.selectedCar._id).then((response) => {
                if (response.status === environment.DATA_RETRIEVED) {
                    this.selectedCar.pictures = response.data;
                }
            });
        }
    }

    openPic(file) {
        if (!file.markForDeletion) {
            window.open(file.name, '_blank');
        }
    }

    deletePic(file) {
        file.markForDeletion = true;

        this.profileService.deletePic(file._id, file.name).then((response) => {
            if (response.status === environment.DATA_UPDATED) {
                this.getCarPics();
                this.setAlert(environment.DATA_UPDATED_MESSAGE, environment.SUCCESS_COLOR);
            } else {
                this.setAlert(environment.DATA_NOT_UPDATED_MESSAGE, environment.FAIL_COLOR);
            }
        });
    }
}
