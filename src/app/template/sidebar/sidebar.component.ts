import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  empresa: Empresa = new Empresa();

  constructor(public navbarService: NavbarService) { 
    if(localStorage.getItem("empresa") != null){
      this.empresa = JSON.parse(localStorage.getItem("empresa"))
    }
  }


  ngOnInit(): void {
  }

}
