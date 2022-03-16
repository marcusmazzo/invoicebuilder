import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../users/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: String = environment.baseUrl;

  msg: String;

  constructor(private http: HttpClient) { }

  criarConta(user:User): Observable<User> {
    return this.http.post<User>(this.baseUrl+"/save", user);
  }

}
