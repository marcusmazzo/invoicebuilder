import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../users/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  msg: String;

  constructor(private http: HttpClient) { }

  criarConta(user:User): Observable<User> {
    return this.http.post<User>("http://localhost:8090/invoice/save", user);
  }

}
