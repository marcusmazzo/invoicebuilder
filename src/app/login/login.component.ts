import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponse } from '../errorresponse';
import { EmpresaService } from '../services/empresa.service';
import { LoginService } from '../services/login.service';
import { UsersService } from '../services/users.service';
import { User } from '../users/user';
import { Authentication } from './authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  auth: Authentication;
  error: ErrorResponse;
  hasError: boolean = false;
  msg: String;

  constructor(private service: LoginService, private router: Router, private empresaService: EmpresaService, private userService: UsersService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.msg = this.userService.msg;
  }

  onSubmit(){
    this.service.authenticate(this.user).subscribe(
      response => {
        this.auth = response;
        localStorage.setItem('refreshToken', this.auth.refreshToken);
        localStorage.setItem('accessToken', this.auth.accessToken);
        this.empresaService.findByToken().subscribe( response => {
          console.log(response);
          
          localStorage.setItem("empresa", JSON.stringify(response));
          this.router.navigate(["/home"]);
        });
      } , errorResponse => {
        this.hasError = true;
        this.error = errorResponse.error;
      }
    )
  }

}
