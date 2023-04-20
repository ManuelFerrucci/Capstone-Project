import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

    constructor(public authSrv: AuthServiceService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.includes('/api/auth/login') || request.url.includes('/api/auth/register')) {
            return next.handle(request);
        }
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer' + this.authSrv.getToken()
            }
        })
        return next.handle(request);
    }
}
