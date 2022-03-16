import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { User } from 'src/app/users/user';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  empresa: Empresa;
  hasError: boolean;
  msg: string;

  constructor(private service: EmpresaService, private route: Router) {

   }

  ngOnInit(): void {
    this.empresa = new Empresa()
    this.empresa.user = new User();
  }

  onSubmit(){
    this.service.saveLogin(this.empresa).
      subscribe(response => {
        this.empresa = response
        this.msg = "Salvo com Sucesso";
        this.route.navigate(['login']).then(_ => null);

      } , errorResponse => {
        console.log(errorResponse);
        this.hasError = true;
        this.msg = errorResponse.error.message;
      }
    );
  }

}
