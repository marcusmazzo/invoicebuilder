import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentication } from '../login/authentication';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  authenticate(user:User): Observable<Authentication> {
    
    return this.http.post<Authentication>(this.baseUrl+"/login", user, {});
  }

  refreshToken(): Observable<Authentication> {
    console.log("refreshToken");
    
    const url = this.baseUrl+"/refreshToken";

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
    return localStorage.getItem("empresa");
  }
}
