import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AccessService } from '../access/access.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    alertTimeout = 2000;

    profileRootURL = environment.rootURL + 'profile/';
    getOwnProfileURL = this.profileRootURL + 'getOwnProfile';
    getProfileURL = this.profileRootURL + 'getProfile';
    updateProfileURL = this.profileRootURL + 'updateProfileData';
    changeEmailURL = this.profileRootURL + 'changeEmail';
    getCountriesURL = this.profileRootURL + 'getCountries';
    getCitiesURL = this.profileRootURL + 'getCities';
    uploadPictureURL = this.profileRootURL + 'uploadPicture';
    uploadCarPictureURL = this.profileRootURL + 'uploadCarPicture';
    getPictureURL = this.profileRootURL + 'getPicture';
    updateVisibilityURL = this.profileRootURL + 'updateVisibility';
    changePasswordURL = this.profileRootURL + 'changePassword';
    addCarURL = this.profileRootURL + 'addCar';
    getCarsURL = this.profileRootURL + 'getCars';
    getCarPicturesURL = this.profileRootURL + 'getCarPictures';
    deleteCarPicURL = this.profileRootURL + 'deleteCarPicture';

    constructor(private sharedService: SharedService, private accessService: AccessService) { }

    getOwnProfile() {
        return new Promise<any>(resolve => {
            this.sharedService.get(this.getOwnProfileURL).then((response) => {
                if (response.status === environment.DATA_RETRIEVED) {
                    this.accessService.loginResponse = response.data;
                    this.accessService.initLogin();
                    this.accessService.refreshUserData(true);
                }

                resolve(response);
            });
        });
    }

    getProfile(profileId) {
        return this.sharedService.get(this.getProfileURL, { params: { profileId: profileId } });
    }

    updateProfileData(body) {
        return this.sharedService.post(this.updateProfileURL, body);
    }

    getCountries() {
        return this.sharedService.get(this.getCountriesURL);
    }

    getCities(country) {
        return this.sharedService.get(this.getCitiesURL, { params: { country: country } });
    }

    updateVisibility(visibility) {
        return this.sharedService.post(this.updateVisibilityURL, { visibility: visibility });
    }

    changePassword(newPassword) {
        return this.sharedService.post(this.changePasswordURL, { newPassword: newPassword });
    }

    uploadPicture(formData: any) {
        return new Promise<any>(resolve => {
            this.sharedService.post(this.uploadPictureURL, formData)
                .then((response: any) => {
                    if (response.status === environment.NOT_LOGGED) {
                        this.accessService.logout();
                        // localStorage.clear();
                        localStorage.setItem('logoutMessage', 'FakeToken');
                        // this.router.navigate(['./login']);
                    } else {
                        // console.log(response.url);
                        if (response.url) {
                            this.sharedService.picture = response.url;
                        }
                        this.accessService.refreshUserData(true);
                        resolve(response);
                    }
                });
        });
    }

    uploadCarPicture(formData: any) {
        return this.sharedService.post(this.uploadCarPictureURL, formData);
    }

    changeEmail(newEmail) {
        const body = {
            email: newEmail
        };

        return this.sharedService.post(this.changeEmailURL, body);
    }

    addCar(body) {
        return this.sharedService.post(this.addCarURL, body);
    }

    getCars() {
        return this.sharedService.get(this.getCarsURL);
    }

    getCarPictures(carId) {
        return this.sharedService.get(this.getCarPicturesURL, { params: { carId: carId } });
    }

    deletePic(fileId, fileName) {
        return this.sharedService.delete(this.deleteCarPicURL, { params: { fileId: fileId, fileName: fileName } });
    }
}
