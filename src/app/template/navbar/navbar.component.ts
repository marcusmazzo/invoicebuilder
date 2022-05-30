import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  empresa: Empresa = new Empresa();

  constructor(public navbarService: NavbarService, private route: Router) { 
    if(localStorage.getItem("empresa") != null){
      this.empresa = JSON.parse(localStorage.getItem("empresa"))
    }
  }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.setItem('refreshToken', null);
    localStorage.setItem('accessToken', null);
    localStorage.setItem("empresa", null)
    this.route.navigate(['login']).then(_ => console.log('redirect to login'));
  }

}
