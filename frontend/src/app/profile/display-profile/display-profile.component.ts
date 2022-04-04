import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-display-profile',
    templateUrl: './display-profile.component.html',
    styleUrls: ['./display-profile.component.css']
})
export class DisplayProfileComponent implements OnInit {
    environment = environment;

    profileId;
    profileData;

    privateProfile = false;

    cars;
    selectedCar;
    selectedPic;
    pictures;

    selectedModalPic;
    showModal = false;
    picsInPreview = 8;

    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private sharedService: SharedService, private router: Router) { }

    ngOnInit() {
        if (!this.sharedService.id) {
            this.router.navigate(['/']);
        }

        this.profileId = this.route.snapshot.paramMap.get('profileId');

        this.getProfile();
    }

    getProfile() {
        this.profileService.getProfile(this.profileId).then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                this.profileData = response.data;

                this.cars = response.cars;
                if (this.cars && this.cars.length > 0) {
                    this.selectCar(this.cars[0]);
                }

                if (this.profileData.birthday) {
                    this.profileData.age = this.sharedService.calcAge(this.profileData.birthday);
                }
            } else if (response.status === environment.PRIVATE_PROFILE) {
                this.privateProfile = true;
            }
        });
    }

    selectCar(car) {
        this.profileService.getCarPictures(car._id).then((response) => {
            if (response.status === environment.DATA_RETRIEVED) {
                this.pictures = response.data;
                if (this.pictures.length > 0) {
                    this.selectedPic = this.pictures[0];
                }
            }

            this.selectedCar = car;
        });
    }

    viewPicture() {
        this.selectedModalPic = this.selectedPic;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    changePic(deltaIdx) {
        const currentIndex = this.pictures.indexOf(this.selectedPic);

        let newIndex = (currentIndex + deltaIdx) % this.pictures.length;

        if (newIndex < 0) {
            newIndex = this.pictures.length - 1;
        }
        this.selectedPic = this.pictures[newIndex];
    }

    changeModalPic(deltaIdx) {
        const currentIndex = this.pictures.indexOf(this.selectedModalPic);

        let newIndex = (currentIndex + deltaIdx) % this.pictures.length;

        if (newIndex < 0) {
            newIndex = this.pictures.length - 1;
        }
        this.selectedModalPic = this.pictures[newIndex];
    }
}
