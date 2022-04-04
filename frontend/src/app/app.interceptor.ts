import { Observable } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { empty } from 'rxjs';
// import { from } from 'rxjs';
// import { JSEncrypt } from 'jsencrypt';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const id = localStorage.getItem('_id');
        const type = localStorage.getItem('type');
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        let newParams = new HttpParams({ fromString: req.params.toString() });

        // const encrypt = new JSEncrypt();
        // const bufstr = token + ';' + id + ';' + email;
        // const pubkey = localStorage.getItem('pubkey');
        // encrypt.setPublicKey(pubkey);
        // const checksum = encrypt.encrypt(bufstr);

        if (id) {
            newParams = newParams.append('user_id', (id ? id : ''));
        }

        let copiedReq = req.clone();
        copiedReq = copiedReq.clone({ params: newParams });
        // copiedReq = copiedReq.clone({ params: newParams, headers: copiedReq.headers.set('Authorization', checksum) });

        const fileupload = req.url.indexOf('uploadPicture') + req.url.indexOf('uploadCarPicture');

        if (!copiedReq.headers.has('Content-Type') && fileupload <= 0) {
            copiedReq = copiedReq.clone({
                headers: copiedReq.headers.set('Content-Type', 'application/json')
                // .set('Authorization', checksum)
            });
            // console.log('non exception for header append', req.url);
        }
        console.log('Intercepted after added header', copiedReq);

        return next.handle(copiedReq);
    }
}
