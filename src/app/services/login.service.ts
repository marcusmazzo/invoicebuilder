import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentication } from '../login/authentication';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private http: HttpClient) { }

  authenticate(user:User): Observable<Authentication> {
    return this.http.post<Authentication>("http://localhost:8090/invoice/login", user);
  }

  refreshToken(): Observable<Authentication> {
    console.log("refreshToken");
    
    const url = 'http://localhost:8090/invoice/refreshToken';

    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<Authentication>(url, refreshToken,
      {
        headers: new HttpHeaders().set('refreshToken', refreshToken)
      }
    );
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  getEmpresa(): string {
    return btoa(localStorage.getItem("empresa"));
  }
}
