import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            const newrequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + 'token')

            });
            return next.handle(newrequest);
        } else {
            return next.handle(req);
        }
    }
}