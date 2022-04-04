import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor(private http: HttpClient) { }

    get id() {
        return localStorage.getItem('_id');
    }

    get picture() {
        return localStorage.getItem('picture');
    }

    set picture(picture) {
        localStorage.setItem('picture', picture);
    }

    get firstName() {
        return localStorage.getItem('firstName');
    }

    get email() {
        return localStorage.getItem('email');
    }

    isAdmin() {
        return (localStorage.getItem('admin') === 'true');
    }

    isModerator() {
        return (localStorage.getItem('moderator') === 'true');
    }

    get(URL, params?) {
        if (!params) {
            params = {};
        }

        return new Promise<any>((resolve) => {
            this.http.get(URL, params).subscribe((response) => {
                resolve(response);
            });
        });
    }

    post(URL, body, params?) {
        return new Promise<any>((resolve) => {
            this.http.post(URL, body, params).subscribe((response) => {
                resolve(response);
            });
        });
    }

    delete(URL, params?) {
        return new Promise<any>((resolve) => {
            this.http.delete(URL, params).subscribe((response) => {
                resolve(response);
            });
        });
    }

    request(httpRequest) {
        return new Promise<any>((resolve) => {
            this.http.request(httpRequest).subscribe((response) => {
                resolve(response);
            });
        });
    }

    formatDate(date: Date) {
        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
            month = '0' + month;
        }

        let day = date.getDate().toString();
        if (day.length === 1) {
            day = '0' + day;
        }

        const year = date.getFullYear().toString();

        return month + '.' + day + '.' + year;
    }

    calcAge(date) {
        const dateA: Date = new Date(date);
        const dateB: Date = new Date(Date());
        const yearGap = dateB.getFullYear() - dateA.getFullYear();
        const monthGap = dateB.getMonth() - dateA.getMonth();
        const age = monthGap < 0 ? yearGap - 1 : yearGap;
        return age;
    }
}
