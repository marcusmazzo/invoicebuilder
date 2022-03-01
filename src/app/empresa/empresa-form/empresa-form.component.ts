import { Component, OnInit } from '@angular/core';
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

  constructor(private service: EmpresaService) {

   }

  ngOnInit(): void {
    this.empresa = new Empresa()
    this.empresa.user = new User();
  }

  onSubmit(){
    console.log(this.empresa);
    this.service.save(this.empresa).
      subscribe(response => {
        this.empresa = response
        this.msg = "Salvo com Sucesso";
      } , errorResponse => {
        console.log(errorResponse);
        this.hasError = true;
        this.msg = errorResponse.error.message;
      }
    );
  }

}
