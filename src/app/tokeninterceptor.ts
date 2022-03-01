import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';


import { LoginService } from './services/login.service';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from './errorresponse';
import { Authentication } from './login/authentication';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  errorResponse: ErrorResponse

  constructor(private auth: LoginService, private route: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`, 
        empresa: `${this.auth.getEmpresa()}`
      }
    });
    
    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),catchError((error: any) => {
        if (error.status === 401){
          if(this.auth.getRefreshToken() !=="null") {
            this.auth.refreshToken()
              .subscribe(response => {
                let auth: Authentication = response;
                localStorage.setItem('refreshToken', auth.refreshToken);
                localStorage.setItem('accessToken', auth.accessToken);
                location.reload();
              });
          } else {
            localStorage.setItem('refreshToken', null);
            localStorage.setItem('accessToken', null);
            localStorage.setItem("empresa", null)
            this.route.navigate(['login']).then(_ => console.log('redirect to login'));
          }
        }
        
        if(this.auth.getToken() === "null"){
          this.route.navigate(['login']).then(_ => console.log('redirect to login'));
        }
        
        return throwError(error);
      }
    )
  )
}
  
}